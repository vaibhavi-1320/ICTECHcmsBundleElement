<?php declare(strict_types=1);

namespace ICTECHcmsBundleElement\Core\Content\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\FieldConfigCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Cms\SalesChannel\Struct\ImageStruct;
use Shopware\Core\Content\Media\Cms\ImageCmsElementResolver;

final class IctThreeColumnCmsElementResolver extends ImageCmsElementResolver
{
    public function getType(): string
    {
        return 'ict-three-column';
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        parent::enrich($slot, $resolverContext, $result);

        $card = new IctThreeColumnCardStruct();
        $fieldConfig = $slot->getFieldConfig();
        $image = $slot->getData();

        if ($image instanceof ImageStruct) {
            if ($image->getMedia() !== null) {
                $card->setMedia($image->getMedia());
            }

            if ($image->getMediaId() !== null) {
                $card->setMediaId($image->getMediaId());
            }

            $card->setUrl($image->getUrl());
            $card->setNewTab($image->getNewTab());
        }

        $card->setEyebrow($this->getStringConfigValue($fieldConfig, 'eyebrow'));
        $card->setTitle($this->getStringConfigValue($fieldConfig, 'title'));
        $card->setText($this->getStringConfigValue($fieldConfig, 'text'));
        $card->setLinkText($this->getStringConfigValue($fieldConfig, 'linkText'));

        if ($card->getUrl() === null) {
            $url = $this->getStringConfigValue($fieldConfig, 'url');

            if ($url !== null) {
                $card->setUrl($url);
            }
        }

        $slot->setData($card);
    }

    private function getStringConfigValue(FieldConfigCollection $fieldConfig, string $key): ?string
    {
        return $this->sanitizeNullableString($fieldConfig->get($key)?->getValue());
    }

    /**
     * @param array<mixed>|bool|float|int|string|null $value
     */
    private function sanitizeNullableString(array|bool|float|int|string|null $value): ?string
    {
        if (!\is_scalar($value) && $value !== null) {
            return null;
        }

        $stringValue = trim((string) $value);

        return $stringValue === '' ? null : $stringValue;
    }
}
