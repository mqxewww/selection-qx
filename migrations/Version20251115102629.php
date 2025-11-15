<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251115102629 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE course (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(31) NOT NULL, description LONGTEXT NOT NULL, capacity SMALLINT NOT NULL, period_start DATETIME NOT NULL, period_end DATETIME NOT NULL, created_at DATETIME NOT NULL, deleted_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE criteria (id INT AUTO_INCREMENT NOT NULL, course_id INT NOT NULL, title VARCHAR(31) NOT NULL, display_order SMALLINT NOT NULL, created_at DATETIME NOT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_B61F9B81591CC992 (course_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE criterion_mark (id INT AUTO_INCREMENT NOT NULL, criterion_id INT NOT NULL, label VARCHAR(31) NOT NULL, mark SMALLINT NOT NULL, created_at DATETIME NOT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_94E3D5B497766307 (criterion_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE criteria ADD CONSTRAINT FK_B61F9B81591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('ALTER TABLE criterion_mark ADD CONSTRAINT FK_94E3D5B497766307 FOREIGN KEY (criterion_id) REFERENCES criteria (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE criteria DROP FOREIGN KEY FK_B61F9B81591CC992');
        $this->addSql('ALTER TABLE criterion_mark DROP FOREIGN KEY FK_94E3D5B497766307');
        $this->addSql('DROP TABLE course');
        $this->addSql('DROP TABLE criteria');
        $this->addSql('DROP TABLE criterion_mark');
    }
}
