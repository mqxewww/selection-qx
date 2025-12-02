<?php

declare(strict_types=1);

namespace App\Dto;

use Symfony\Component\Validator\Constraints;

class CriteriaUpdateDto
{
    #[Constraints\NotBlank]
    public ?string $title = null;

    /**
     * @var CriterionMarkUpdateDto[]
     */
    #[Constraints\Valid]
    #[Constraints\All([new Constraints\Type(type: CriterionMarkUpdateDto::class)])]
    public array $marks = [];
}
