<?php

namespace App\Twig\Components;

use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
class CourseInfo
{
    use DefaultActionTrait;

    #[LiveProp]
    public int $courseId;

    #[LiveProp]
    public int $applicationsCount;

    #[LiveProp]
    public string $createdAt;

    #[LiveProp]
    public string $period;

    #[LiveProp(writable: true)]
    public int $capacity;

    #[LiveProp]
    public bool $isEditMode = false;

    #[LiveAction]
    public function enableEdit(): void
    {
        $this->isEditMode = true;
    }

    #[LiveAction]
    public function cancel(): void
    {
        $this->isEditMode = false;
    }

    #[LiveAction]
    public function save(): void
    {
        $this->isEditMode = false;
    }

    #[LiveAction]
    public function delete(): void
    {
    }
}
