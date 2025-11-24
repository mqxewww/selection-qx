<?php

declare(strict_types=1);

namespace App\Dto;

use Symfony\Component\Validator\Constraints;

class CriterionMarkUpdateDto
{
    public ?int $id = null;

    #[Constraints\NotBlank]
    public ?string $label = null;

    #[Constraints\NotBlank]
    public ?int $mark = null;

    public ?bool $delete = null;
}
