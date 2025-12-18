<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\CourseRepository;
use App\State\CourseDeleteProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria as DoctrineCriteria;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CourseRepository::class)]
#[ApiResource(
    operations: [
        new Get(normalizationContext: ['groups' => ['course:item']]),
        new GetCollection(normalizationContext: ['groups' => ['course:list']]),
        new Post(),
        new Patch(),
        new Delete(processor: CourseDeleteProcessor::class),
    ],
    denormalizationContext: ['groups' => ['course:write']],
    order: ['createdAt' => 'ASC']
)]
class Course
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['course:list', 'course:item', 'course:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['course:list', 'course:item', 'course:write'])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['course:list', 'course:item', 'course:write'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::SMALLINT)]
    #[Groups(['course:list', 'course:item', 'course:write'])]
    private ?int $capacity = null;

    #[ORM\Column]
    #[Groups(['course:list', 'course:item', 'course:write'])]
    private ?\DateTime $periodStart = null;

    #[ORM\Column]
    #[Groups(['course:list', 'course:item', 'course:write'])]
    private ?\DateTime $periodEnd = null;

    #[ORM\Column]
    #[Groups(['course:list', 'course:item'])]
    private ?\DateTime $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTime $deletedAt = null;

    /**
     * @var Collection<int, Criterion>
     */
    #[ORM\OneToMany(targetEntity: Criterion::class, mappedBy: 'course')]
    #[Groups(['course:item'])]
    private Collection $criteria;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->criteria = new ArrayCollection();
    }

    #[Groups(['course:list', 'course:item'])]
    public function getApplicationsCount(): int
    {
        return rand(2, 10);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): static
    {
        $this->capacity = $capacity;

        return $this;
    }

    public function getPeriodStart(): ?\DateTime
    {
        return $this->periodStart;
    }

    public function setPeriodStart(\DateTime $periodStart): static
    {
        $this->periodStart = $periodStart;

        return $this;
    }

    public function getPeriodEnd(): ?\DateTime
    {
        return $this->periodEnd;
    }

    public function setPeriodEnd(\DateTime $periodEnd): static
    {
        $this->periodEnd = $periodEnd;

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

    public function getDeletedAt(): ?\DateTime
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?\DateTime $deletedAt): static
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }

    /**
     * @return Collection<int, Criterion>
     */
    #[Groups(['course:item'])]
    public function getCriteria(): Collection
    {
        $criteria = DoctrineCriteria::create()
            ->where(DoctrineCriteria::expr()->eq('deletedAt', null));

        return new ArrayCollection($this->criteria->matching($criteria)->getValues());
    }

    public function addCriterion(Criterion $criterion): static
    {
        if (!$this->criteria->contains($criterion)) {
            $this->criteria->add($criterion);
            $criterion->setCourse($this);
        }

        return $this;
    }

    public function removeCriterion(Criterion $criterion): static
    {
        if ($this->criteria->removeElement($criterion)) {
            // set the owning side to null (unless already changed)
            if ($criterion->getCourse() === $this) {
                $criterion->setCourse(null);
            }
        }

        return $this;
    }
}
