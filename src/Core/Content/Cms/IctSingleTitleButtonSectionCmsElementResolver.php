<?php declare(strict_types=1);

namespace ICTECHcmsBundleElement\Core\Content\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Framework\Struct\ArrayStruct;

class IctSingleTitleButtonSectionCmsElementResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'ict-single-title-button-section';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $config = $slot->getFieldConfig();
        $collection = new CriteriaCollection();
        $mediaConfigs = [
            'backgroundImage' => 'media_',
            'backgroundVideo' => 'video_',
            'leftButtonIcon' => 'leftButtonIcon_',
            'rightButtonIcon' => 'rightButtonIcon_'
        ];

        foreach ($mediaConfigs as $configKey => $prefix) {
            $mediaConfig = $config->get($configKey);
            if ($mediaConfig && $mediaConfig->getValue() && is_string($mediaConfig->getValue())) {
                $criteria = new \Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria([$mediaConfig->getValue()]);
                $collection->add($prefix . $slot->getUniqueIdentifier(), \Shopware\Core\Content\Media\MediaDefinition::class, $criteria);
            }
        }
        return $collection->all() ? $collection : null;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $data = [];
        $mediaConfigs = [
            'backgroundImage' => ['prefix' => 'media_', 'dataKey' => 'media'],
            'backgroundVideo' => ['prefix' => 'video_', 'dataKey' => 'video'],
            'leftButtonIcon' => ['prefix' => 'leftButtonIcon_', 'dataKey' => 'leftButtonIcon'],
            'rightButtonIcon' => ['prefix' => 'rightButtonIcon_', 'dataKey' => 'rightButtonIcon']
        ];

        foreach ($mediaConfigs as $configKey => $configuration) {
            $mediaConfig = $config->get($configKey);
            if ($mediaConfig && $mediaConfig->getValue()) {
                $media = $result->get($configuration['prefix'] . $slot->getUniqueIdentifier());
                if ($media) {
                    $data[$configuration['dataKey']] = $media->first();
                }
            }
        }
        $slot->setData(new ArrayStruct($data));
    }
}
