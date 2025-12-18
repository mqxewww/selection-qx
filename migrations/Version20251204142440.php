<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251204142440 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(
            'CREATE TABLE course (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, capacity SMALLINT NOT NULL, period_start DATETIME NOT NULL, period_end DATETIME NOT NULL, created_at DATETIME NOT NULL, deleted_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB'
        );
        $this->addSql(
            'CREATE TABLE criterion (id INT AUTO_INCREMENT NOT NULL, course_id INT NOT NULL, title VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_7C822271591CC992 (course_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB'
        );
        $this->addSql(
            'CREATE TABLE criterion_mark (id INT AUTO_INCREMENT NOT NULL, criterion_id INT NOT NULL, label VARCHAR(255) NOT NULL, mark INT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_94E3D5B497766307 (criterion_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB'
        );
        $this->addSql(
            'ALTER TABLE criterion ADD CONSTRAINT FK_7C822271591CC992 FOREIGN KEY (course_id) REFERENCES course (id)'
        );
        $this->addSql(
            'ALTER TABLE criterion_mark ADD CONSTRAINT FK_94E3D5B497766307 FOREIGN KEY (criterion_id) REFERENCES criterion (id)'
        );
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE criterion DROP FOREIGN KEY FK_7C822271591CC992');
        $this->addSql('ALTER TABLE criterion_mark DROP FOREIGN KEY FK_94E3D5B497766307');
        $this->addSql('DROP TABLE course');
        $this->addSql('DROP TABLE criterion');
        $this->addSql('DROP TABLE criterion_mark');
    }
}
