<?php

declare(strict_types=1);

namespace ICTECHcmsBundleElement;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Exception;
use Doctrine\DBAL\ParameterType;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;

final class ICTECHcmsBundleElement extends Plugin
{
    public function uninstall(UninstallContext $uninstallContext): void
    {
        parent::uninstall($uninstallContext);

        if ($uninstallContext->keepUserData()) {
            return;
        }

        if ($this->container === null) {
            return;
        }

        /** @var Connection $connection */
        $connection = $this->container->get(Connection::class);

        // Remove CMS blocks/slots created with this plugin's custom types so a reinstall
        // does not "restore" previously configured elements when user data is removed.
        $this->removeCmsEntities($connection);

        $connection->executeStatement(
            'DELETE FROM system_config WHERE configuration_key LIKE :prefix',
            ['prefix' => 'ICTECHcmsBundleElement.config.%']
        );
    }

    private function removeCmsEntities(Connection $connection): void
    {
        $blockTypes = $this->discoverCmsTypes(__DIR__ . '/Resources/app/administration/src/module/sw-cms/blocks');
        $elementTypes = $this->discoverCmsTypes(__DIR__ . '/Resources/app/administration/src/module/sw-cms/elements');

        if ($elementTypes !== []) {
            $this->deleteByTypes($connection, 'cms_slot', $elementTypes);
        }

        if ($blockTypes !== []) {
            $this->deleteByTypes($connection, 'cms_block', $blockTypes);
        }
    }

    /**
     * @return list<string>
     */
    private function discoverCmsTypes(string $directory): array
    {
        if (!is_dir($directory)) {
            return [];
        }

        $entries = scandir($directory);
        if ($entries === false) {
            return [];
        }

        $types = [];
        foreach ($entries as $entry) {
            if ($entry === '.' || $entry === '..') {
                continue;
            }

            $path = $directory . '/' . $entry;
            if (!is_dir($path)) {
                continue;
            }

            // Directory name is the CMS type (e.g. "ict-hero-banner").
            $types[] = $entry;
        }

        sort($types);
        return array_values(array_unique($types));
    }

    /**
     * @param list<string> $types
     */
    private function deleteByTypes(Connection $connection, string $table, array $types): void
    {
        // Doctrine DBAL v2 and v3 differ in array parameter types.
        $parameterType = null;
        if (class_exists(\Doctrine\DBAL\ArrayParameterType::class)) {
            /** @var int $parameterType */
            $parameterType = \Doctrine\DBAL\ArrayParameterType::STRING;
        } elseif (defined(Connection::class . '::PARAM_STR_ARRAY')) {
            /** @var int $parameterType */
            $parameterType = Connection::PARAM_STR_ARRAY;
        } else {
            // Fallback: bind as string and let DBAL handle it (better than hard failing).
            $parameterType = ParameterType::STRING;
        }

        try {
            $connection->executeStatement(
                sprintf('DELETE FROM %s WHERE type IN (:types)', $table),
                ['types' => $types],
                ['types' => $parameterType]
            );
        } catch (Exception) {
            // If the table/column doesn't exist in the current Shopware version,
            // uninstall should still complete without blocking.
        }
    }
}
