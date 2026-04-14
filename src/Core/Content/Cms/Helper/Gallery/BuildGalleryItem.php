<?php declare(strict_types=1);

namespace ICTECHcmsBundleElement\Core\Content\Cms\Helper\Gallery;

use Shopware\Core\Content\Media\MediaEntity;

final class BuildGalleryItem
{
    public function __construct(
        private readonly MapGalleryItem $mapper,
    ) {
    }

    /**
     * @param array<array-key, mixed> $rawItems
     * @return list<array{media: MediaEntity, mediaId: string, mediaUrl: string, title: string}>
     */
    public function buildAll(array $rawItems, mixed $mediaCollection): array
    {
        $items = [];

        foreach ($rawItems as $item) {
            if (!\is_array($item)) {
                continue;
            }

            $mapped = $this->mapper->map($item, $mediaCollection);

            if ($mapped !== null) {
                $items[] = $mapped;
            }
        }

        return $items;
    }
}
