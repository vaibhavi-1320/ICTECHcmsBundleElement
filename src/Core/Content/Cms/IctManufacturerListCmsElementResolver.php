<?php declare(strict_types=1);

namespace ICTECHcmsBundleElement\Core\Content\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Product\Aggregate\ProductManufacturer\ProductManufacturerDefinition;
use Shopware\Core\Content\Product\Aggregate\ProductManufacturer\ProductManufacturerEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\EntitySearchResult;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class IctManufacturerListCmsElementResolver extends AbstractCmsElementResolver
{
    private const TYPE = 'ict-manufacturer-list';

    public function getType(): string
    {
        return self::TYPE;
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $criteria = new Criteria();
        $criteria->setLimit(500);
        $criteria->addAssociation('media');
        $criteria->addSorting(new FieldSorting('name', FieldSorting::ASCENDING, true));

        $criteriaCollection = new CriteriaCollection();
        $criteriaCollection->add(
            'manufacturers_' . $slot->getUniqueIdentifier(),
            ProductManufacturerDefinition::class,
            $criteria,
        );

        return $criteriaCollection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $manufacturersResult = $result->get('manufacturers_' . $slot->getUniqueIdentifier());
        $groups = $this->createEmptyGroups();

        if ($manufacturersResult instanceof EntitySearchResult) {
            foreach ($manufacturersResult->getElements() as $manufacturer) {
                if (!$manufacturer instanceof ProductManufacturerEntity) {
                    continue;
                }

                $name = trim((string) ($manufacturer->getTranslation('name') ?? $manufacturer->getName() ?? ''));

                if ($name === '') {
                    continue;
                }

                $groupKey = $this->resolveGroupKey($name);
                $groups[$groupKey][] = [
                    'id' => $manufacturer->getId(),
                    'name' => $name,
                    'link' => $this->normalizeManufacturerLink($manufacturer->getLink()),
                    'media' => $manufacturer->getMedia(),
                ];
            }
        }

        $groupedManufacturers = [];
        $alphabet = [];

        foreach ($groups as $key => $items) {
            $anchor = sprintf(
                'ict-manufacturer-list-%s-%s',
                $slot->getUniqueIdentifier(),
                strtolower($key === '#' ? 'numeric' : $key),
            );

            $alphabet[] = [
                'key' => $key,
                'label' => $key,
                'anchor' => $items !== [] ? $anchor : null,
            ];

            if ($items === []) {
                continue;
            }

            $groupedManufacturers[] = [
                'key' => $key,
                'label' => $key,
                'anchor' => $anchor,
                'items' => $items,
            ];
        }

        $slot->setData(new ArrayStruct([
            'alphabet' => $alphabet,
            'groups' => $groupedManufacturers,
        ]));
    }

    /**
     * @return array<string, array<int, array<string, mixed>>>
     */
    private function createEmptyGroups(): array
    {
        $groups = ['#' => []];

        foreach (range('A', 'Z') as $letter) {
            $groups[$letter] = [];
        }

        return $groups;
    }

    private function resolveGroupKey(string $name): string
    {
        $firstCharacter = mb_strtoupper(mb_substr($name, 0, 1));

        if (preg_match('/[A-Z]/', $firstCharacter) === 1) {
            return $firstCharacter;
        }

        return '#';
    }

    private function normalizeManufacturerLink(?string $link): ?string
    {
        $normalizedLink = trim((string) $link);

        if ($normalizedLink === '') {
            return null;
        }

        if (preg_match('#^https?://#i', $normalizedLink) === 1) {
            return $normalizedLink;
        }

        return 'https://' . ltrim($normalizedLink, '/');
    }
}
