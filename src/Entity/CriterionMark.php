<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CriterionMarkRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CriterionMarkRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [],
    order: ['createdAt' => 'ASC']
)]
class CriterionMark
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['criterion:write', 'course:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['criterion:write', 'course:item'])]
    private ?string $label = null;

    #[ORM\Column]
    #[Groups(['criterion:write', 'course:item'])]
    private ?int $mark = null;

    #[ORM\Column]
    private ?\DateTime $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'marks')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Criterion $criterion = null;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

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

    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTime $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCriterion(): ?Criterion
    {
        return $this->criterion;
    }

    public function setCriterion(?Criterion $criterion): static
    {
        $this->criterion = $criterion;

        return $this;
    }
}
