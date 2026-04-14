<?php declare(strict_types=1);

namespace ICTECHcmsBundleElement\Core\Content\Cms\Helper\Category;

use Shopware\Core\Content\Category\CategoryEntity;

final class BuildCategoryCard
{
    public function __construct(
        private readonly MapCategoryCard $mapper,
    ) {
    }

    /**
     * @param array<array-key, mixed> $cards
     * @return list<array{category: CategoryEntity, title: string}>
     */
    public function buildAll(array $cards, mixed $categoriesResult): array
    {
        $items = [];

        foreach ($cards as $card) {
            if (!\is_array($card)) {
                continue;
            }

            $mapped = $this->mapper->map($card, $categoriesResult);

            if ($mapped !== null) {
                $items[] = $mapped;
            }
        }

        return $items;
    }
}
