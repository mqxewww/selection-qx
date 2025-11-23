<?php

declare(strict_types=1);

namespace App\Dto;

use Symfony\Component\Validator\Constraints;

class CriteriaCreateDto
{
    #[Constraints\NotBlank]
    public ?string $title = null;

    #[Constraints\NotBlank]
    #[Constraints\Positive]
    public ?int $courseId = null;

    /**
     * @var CriterionMarkCreateDto[]
     */
    #[Constraints\Valid]
    #[Constraints\All([new Constraints\Type(type: CriterionMarkCreateDto::class)])]
    public array $criterionMarks = [];
}
