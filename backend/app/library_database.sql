DROP DATABASE IF EXISTS `sql_library`;
CREATE DATABASE `sql_library`; 
USE `sql_library`;

CREATE TABLE `Authors` (
  `id` INT(50) NOT NULL AUTO_INCREMENT,
  `authorName` VARCHAR(50),
  `birthDate` VARCHAR(50),
  `deathDate` VARCHAR(50),
  `isInspector` boolean,
  PRIMARY KEY(`id`)
);

INSERT INTO `Authors` (`id`, `authorName`, `birthDate`, `deathDate`, `isInspector`) VALUES
(1, 'James C. Collins', 'January 25, 1958', 'still alive', 0),
(2, 'Benjamin Graham', 'May 08, 1894', 'September 21, 1976', 1),
(3, 'David Allen', 'December 28, 1945', 'still alive', 1),
(4, 'Stephen R. Covey', 'October 24, 1932', 'July 16, 2012', 0),
(5, 'Michael E. Gerber', 'June 20, 1936', 'still alive', 0);

CREATE TABLE `Categories` (
  `id` INT(50) NOT NULL AUTO_INCREMENT,
  `categoryName` VARCHAR(50),
  PRIMARY KEY(`id`)
);

INSERT INTO `Categories` (`id`, `categoryName`) VALUES
(1, 'productivité'),
(2, 'Entreprenariat'),
(3, 'Développement personnel');

CREATE TABLE `Editions` (
    `id` INT(50) NOT NULL AUTO_INCREMENT,
    `editionName` VARCHAR(50),
    PRIMARY KEY(`id`)
);

INSERT INTO `Editions` (`id`, `editionName`) VALUES
(1, '1949'),
(2, '1985'),
(3, '1988'),
(4, '1994'),
(5, '2001'),
(6, '2003');

CREATE TABLE `Books` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100),
    `authorId` INT(11),
    `editionId` INT(11),
    `categoryId` INT(11),
    `language` VARCHAR(50),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`authorId`)
        REFERENCES `Authors` (`id`) ON DELETE set NULL,
    FOREIGN KEY (`editionId`)
        REFERENCES `Editions` (`id`) ON DELETE set NULL,
    FOREIGN KEY (`categoryId`)
        REFERENCES `Categories` (`id`) ON DELETE set NULL
);

INSERT INTO `Books` (`id`,`title`,`authorId`,`editionId`,`categoryId`,`language`) VALUES
(1, 'Good to Great: Why Some Companies Make the Leap... and Others Don''t', 1, 5, 1, 'en'),
(2, 'The Intelligent Investor', 2, 1, 3, 'en'),
(3, 'Built to Last: Successful Habits of Visionary Companies', 1, 4, 2, 'en'),
(4, 'Getting Things Done: The Art of Stress-Free Productivity', 3, 5, 1, 'en'),
(5, 'The E-Myth Revisited: Why Most Small Businesses Don''t Work and What to Do About It', 5, 2, 1, 'en'),
(6, 'The 7 Habits of Highly Effective People: Powerful Lessons in Personal Change', 4, 3, 3, 'en'),
(7, 'Making It All Work: Winning at the Game of Work and Business of Life', 3, 6, 1, 'en'),
(8, 'Mon livre', 1, 1, 1, 'fr');