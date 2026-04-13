<?php declare(strict_types=1);

namespace ICTECHcmsBundleElement\Core\Content\Cms;

use Shopware\Core\Content\Category\CategoryDefinition;
use Shopware\Core\Content\Category\CategoryEntity;
use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\EntitySearchResult;
use Shopware\Core\Framework\Struct\ArrayStruct;

final class IctCategoryImageSliderCmsElementResolver extends AbstractCmsElementResolver
{
    private const TYPE = 'ict-category-image-slider';

    public function getType(): string
    {
        return self::TYPE;
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $cardsField = $slot->getFieldConfig()->get('cards');

        if ($cardsField === null) {
            return null;
        }

        $categoryIds = $this->extractCategoryIds($cardsField->getArrayValue());

        if ($categoryIds === []) {
            return null;
        }

        $criteria = new Criteria($categoryIds);
        $criteria->addAssociation('media');

        $criteriaCollection = new CriteriaCollection();
        $criteriaCollection->add('category_' . $slot->getUniqueIdentifier(), CategoryDefinition::class, $criteria);

        return $criteriaCollection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $config = $slot->getFieldConfig();
        $cards = $config->get('cards')?->getArrayValue() ?? [];
        $categoriesResult = $result->get('category_' . $slot->getUniqueIdentifier());

        $items = [];

        foreach ($cards as $card) {
            if (!\is_array($card)) {
                continue;
            }

            $categoryId = $card['categoryId'] ?? null;
            if (!\is_string($categoryId) || $categoryId === '') {
                continue;
            }

            $category = null;
            if ($categoriesResult instanceof EntitySearchResult) {
                $candidate = $categoriesResult->get($categoryId);
                if ($candidate instanceof CategoryEntity) {
                    $category = $candidate;
                }
            }

            if (!$category instanceof CategoryEntity || $category->getMedia() === null) {
                continue;
            }

            $items[] = [
                'category' => $category,
                'title' => $this->getCardTitle($card),
            ];
        }

        $slot->setData(new ArrayStruct([
            'items' => $items,
        ]));
    }

    /**
     * @param array<array-key, mixed> $cards
     *
     * @return list<string>
     */
    private function extractCategoryIds(array $cards): array
    {
        $categoryIds = [];

        foreach ($cards as $card) {
            if (!\is_array($card)) {
                continue;
            }

            $categoryId = $card['categoryId'] ?? null;
            if (!\is_string($categoryId) || $categoryId === '') {
                continue;
            }

            $categoryIds[] = $categoryId;
        }

        return array_values(array_unique($categoryIds));
    }

    /**
     * @param array<string, mixed> $card
     */
    private function getCardTitle(array $card): string
    {
        $title = $card['title'] ?? '';

        return \is_string($title) ? $title : '';
    }
}

