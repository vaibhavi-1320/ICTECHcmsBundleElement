<?php declare(strict_types=1);

namespace ICTECHcmsBundleElement\Core\Content\Cms;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\EntitySearchResult;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class IctImageGalleryCmsElementResolver extends AbstractCmsElementResolver
{
    private const TYPE = 'ict-image-gallery';

    public function getType(): string
    {
        return self::TYPE;
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $galleryItems = $slot->getFieldConfig()->get('galleryItems');

        if ($galleryItems === null || $galleryItems->getValue() === null) {
            return null;
        }

        $mediaIds = $this->getMediaIds($galleryItems->getArrayValue());

        if ($mediaIds === []) {
            return null;
        }

        $criteria = new Criteria($mediaIds);
        $criteriaCollection = new CriteriaCollection();
        $criteriaCollection->add('media_' . $slot->getUniqueIdentifier(), MediaDefinition::class, $criteria);

        return $criteriaCollection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $galleryItems = [];
        $mediaCollection = $result->get('media_' . $slot->getUniqueIdentifier());

        $rawItems = $config->get('galleryItems');
        if ($rawItems !== null) {
            foreach ($rawItems->getArrayValue() as $item) {
                if (!\is_array($item)) {
                    continue;
                }

                $mediaId = $item['mediaId'] ?? null;
                if (!\is_string($mediaId) || $mediaId === '') {
                    continue;
                }

                $media = null;
                if ($mediaCollection instanceof EntitySearchResult) {
                    $candidate = $mediaCollection->get($mediaId);
                    if ($candidate instanceof MediaEntity) {
                        $media = $candidate;
                    }
                }

                if (!$media instanceof MediaEntity) {
                    continue;
                }

                $galleryItems[] = [
                    'media' => $media,
                    'mediaId' => $mediaId,
                    'mediaUrl' => $media->getUrl(),
                    'title' => $this->getItemTitle($item),
                ];
            }
        }

        $slot->setData(new ArrayStruct([
            'galleryTitle' => $config->get('galleryTitle')?->getStringValue() ?? '',
            'columns' => $this->normalizeColumns($config->get('columns')?->getValue()),
            'galleryItems' => $galleryItems,
        ]));
    }

    /**
     * @param array<array-key, mixed> $galleryItems
     *
     * @return list<string>
     */
    private function getMediaIds(array $galleryItems): array
    {
        $mediaIds = [];

        foreach ($galleryItems as $item) {
            if (!\is_array($item)) {
                continue;
            }

            $mediaId = $item['mediaId'] ?? null;
            if (!\is_string($mediaId) || $mediaId === '') {
                continue;
            }

            $mediaIds[] = $mediaId;
        }

        return array_values(array_unique($mediaIds));
    }

    /**
     * @param array<string, mixed> $item
     */
    private function getItemTitle(array $item): string
    {
        $title = $item['title'] ?? '';

        return \is_string($title) ? $title : '';
    }

    /**
     * @param mixed $columns
     */
    private function normalizeColumns(mixed $columns): int
    {
        $value = (int) $columns;

        if ($value < 1) {
            return 1;
        }

        if ($value > 6) {
            return 6;
        }

        return $value;
    }
}
