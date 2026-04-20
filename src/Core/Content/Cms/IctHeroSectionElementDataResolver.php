<?php

declare(strict_types=1);

namespace ICTECHcmsBundleElement\Core\Content\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Struct\ArrayStruct;

class IctHeroSectionElementDataResolver extends AbstractCmsElementResolver
{
     public function getType(): string
    {
        return 'ict-hero-section';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $criteriaCollection = new CriteriaCollection();
        $config = $slot->getFieldConfig();
        
        if ($config->count() === 0) {
            return null;
        }

        $mediaIds = [];

        // Collect background image
        $backgroundImage = $config->get('backgroundImage');
        if ($backgroundImage && $backgroundImage->getValue() && is_string($backgroundImage->getValue())) {
            $mediaIds[] = $backgroundImage->getValue();
        }

        // Collect background video
        $backgroundVideo = $config->get('backgroundVideo');
        if ($backgroundVideo && $backgroundVideo->getValue() && is_string($backgroundVideo->getValue())) {
            $mediaIds[] = $backgroundVideo->getValue();
        }

        // Collect primary button icon
        $primaryButtonIcon = $config->get('primaryButtonIcon');
        if ($primaryButtonIcon && $primaryButtonIcon->getValue() && is_string($primaryButtonIcon->getValue())) {
            $mediaIds[] = $primaryButtonIcon->getValue();
        }

        // Collect secondary button icon
        $secondaryButtonIcon = $config->get('secondaryButtonIcon');
        if ($secondaryButtonIcon && $secondaryButtonIcon->getValue() && is_string($secondaryButtonIcon->getValue())) {
            $mediaIds[] = $secondaryButtonIcon->getValue();
        }

        // Collect feature icons
        $featureItems = $config->get('featureItems');
        if ($featureItems && $featureItems->getValue() && is_array($featureItems->getValue())) {
            foreach ($featureItems->getValue() as $item) {
                if (is_array($item) && isset($item['icon']) && is_string($item['icon'])) {
                    $mediaIds[] = $item['icon'];
                }
            }
        }

        if (!empty($mediaIds)) {
            $criteria = new Criteria($mediaIds);
            $criteriaCollection->add('media_' . $this->getType(), MediaDefinition::class, $criteria);
        }

        return $criteriaCollection->all() ? $criteriaCollection : null;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $data = new ArrayStruct();

        // Get media collection
        $mediaCollection = $result->get('media_' . $this->getType());

        // Enrich background image
        $backgroundImage = $config->get('backgroundImage');
        if ($backgroundImage && is_string($backgroundImage->getValue())) {
            $media = $mediaCollection ? $mediaCollection->get($backgroundImage->getValue()) : null;
            $data->set('media', $media);
        }

        // Enrich background video
        $backgroundVideo = $config->get('backgroundVideo');
        if ($backgroundVideo && is_string($backgroundVideo->getValue())) {
            $video = $mediaCollection ? $mediaCollection->get($backgroundVideo->getValue()) : null;
            $data->set('video', $video);
        }

        // Enrich primary button icon
        $primaryButtonIcon = $config->get('primaryButtonIcon');
        if ($primaryButtonIcon && is_string($primaryButtonIcon->getValue())) {
            $primaryButtonIconMedia = $mediaCollection ? $mediaCollection->get($primaryButtonIcon->getValue()) : null;
            $data->set('primaryButtonIcon', $primaryButtonIconMedia);
        }

        // Enrich secondary button icon
        $secondaryButtonIcon = $config->get('secondaryButtonIcon');
        if ($secondaryButtonIcon && is_string($secondaryButtonIcon->getValue())) {
            $secondaryButtonIconMedia = $mediaCollection ? $mediaCollection->get($secondaryButtonIcon->getValue()) : null;
            $data->set('secondaryButtonIcon', $secondaryButtonIconMedia);
        }

        // Enrich feature icons
        $featureIcons = [];
        $featureItems = $config->get('featureItems');
        if ($featureItems && $featureItems->getValue() && is_array($featureItems->getValue())) {
            foreach ($featureItems->getValue() as $index => $item) {
                if (is_array($item) && isset($item['icon']) && is_string($item['icon'])) {
                    $featureIcon = $mediaCollection ? $mediaCollection->get($item['icon']) : null;
                    $featureIcons[$index] = $featureIcon;
                }
            }
        }
        $data->set('featureIcons', $featureIcons);

        // Set feature items data for fallback
        if ($featureItems && $featureItems->getValue()) {
            $data->set('featureItems', $featureItems->getValue());
        }

        $slot->setData($data);
    }
}
