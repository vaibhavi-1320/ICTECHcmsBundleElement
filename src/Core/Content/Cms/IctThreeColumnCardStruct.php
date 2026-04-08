<?php declare(strict_types=1);

namespace ICTECHcmsBundleElement\Core\Content\Cms;

use Shopware\Core\Content\Cms\SalesChannel\Struct\ImageStruct;

final class IctThreeColumnCardStruct extends ImageStruct
{
    protected ?string $eyebrow = null;

    protected ?string $title = null;

    protected ?string $text = null;

    protected ?string $linkText = null;

    public function getApiAlias(): string
    {
        return 'ictech_cms_three_column_card';
    }

    public function getEyebrow(): ?string
    {
        return $this->eyebrow;
    }

    public function setEyebrow(?string $eyebrow): void
    {
        $this->eyebrow = $eyebrow;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text): void
    {
        $this->text = $text;
    }

    public function getLinkText(): ?string
    {
        return $this->linkText;
    }

    public function setLinkText(?string $linkText): void
    {
        $this->linkText = $linkText;
    }
}
