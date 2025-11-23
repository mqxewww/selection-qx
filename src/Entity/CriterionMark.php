<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\CriterionMarkRepository;
use DateTime;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CriterionMarkRepository::class)]
class CriterionMark
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 31)]
    private ?string $label = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $mark = null;

    #[ORM\Column]
    private ?DateTime $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?DateTime $deletedAt = null;

    #[ORM\ManyToOne(inversedBy: 'criterionMarks')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Criteria $criterion = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getMark(): ?int
    {
        return $this->mark;
    }

    public function setMark(int $mark): static
    {
        $this->mark = $mark;

        return $this;
    }

    public function getCreatedAt(): ?DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTime $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getDeletedAt(): ?DateTime
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?DateTime $deletedAt): static
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }

    public function getCriterion(): ?Criteria
    {
        return $this->criterion;
    }

    public function setCriterion(?Criteria $criterion): static
    {
        $this->criterion = $criterion;

        return $this;
    }
}
