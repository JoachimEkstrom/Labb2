-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 13, 2020 at 10:06 AM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `biblan`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `reset_loaned` ()  NO SQL
    COMMENT 'Set all booked to be housed in the library'
BEGIN
	UPDATE books SET books.loaned = 0 WHERE 1;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `firstName` varchar(30) COLLATE utf8mb4_swedish_ci NOT NULL,
  `lastName` varchar(30) COLLATE utf8mb4_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `firstName`, `lastName`) VALUES
(1, 'JRR', 'Tolkien'),
(2, 'David', 'Eddings'),
(5, 'Aron', 'Flam'),
(6, 'Lars', 'Wilderäng');

-- --------------------------------------------------------

--
-- Table structure for table `authors_books`
--

CREATE TABLE `authors_books` (
  `id` int(11) NOT NULL,
  `authorID` int(11) NOT NULL,
  `bookID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumping data for table `authors_books`
--

INSERT INTO `authors_books` (`id`, `authorID`, `bookID`) VALUES
(1, 5, 13),
(6, 5, 14),
(7, 2, 17),
(8, 2, 18),
(9, 1, 1),
(10, 1, 21),
(11, 1, 3),
(12, 6, 6),
(13, 6, 5),
(14, 6, 4),
(15, 2, 19);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_swedish_ci NOT NULL,
  `genre` varchar(30) COLLATE utf8mb4_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `genre`) VALUES
(1, 'The fellowship of the ring', 'Fanatsy'),
(3, 'The Return of the King', 'Fantasy'),
(4, 'Stjärnklart', 'Dystropi'),
(5, 'Stjärnfall', 'Dystropi'),
(6, 'Stjärndamm', 'Dystropi'),
(13, 'Jag bombade', 'Dokumentär'),
(14, 'Det här är en svensk tiger', 'Samhälle'),
(17, 'The Belgariand', 'Fantasy'),
(18, 'The Malloreon', 'Fantasy'),
(19, 'The Elenium', 'Fantasy'),
(20, 'The several towers', 'Thriller'),
(21, 'The Many Towers', 'Fantasy');

-- --------------------------------------------------------

--
-- Table structure for table `borrowers`
--

CREATE TABLE `borrowers` (
  `id` int(11) NOT NULL,
  `firstName` varchar(30) COLLATE utf8mb4_swedish_ci NOT NULL,
  `lastName` varchar(30) COLLATE utf8mb4_swedish_ci NOT NULL,
  `age` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumping data for table `borrowers`
--

INSERT INTO `borrowers` (`id`, `firstName`, `lastName`, `age`) VALUES
(1, 'Joachim', 'Ekström', 35),
(2, 'Bingo ', 'Berra', 1000),
(3, 'Bo', 'Bengtsson', 54);

-- --------------------------------------------------------

--
-- Table structure for table `borrowers_books`
--

CREATE TABLE `borrowers_books` (
  `id` int(11) NOT NULL,
  `borrowerID` int(11) NOT NULL,
  `bookID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumping data for table `borrowers_books`
--

INSERT INTO `borrowers_books` (`id`, `borrowerID`, `bookID`) VALUES
(1, 2, 14),
(2, 3, 17),
(3, 1, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `authors_books`
--
ALTER TABLE `authors_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `books_ID` (`bookID`) USING BTREE,
  ADD KEY `authors_ID` (`authorID`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `borrowers`
--
ALTER TABLE `borrowers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `borrowers_books`
--
ALTER TABLE `borrowers_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Borrower_ID` (`borrowerID`),
  ADD KEY `bookID` (`bookID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `authors_books`
--
ALTER TABLE `authors_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `borrowers`
--
ALTER TABLE `borrowers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `borrowers_books`
--
ALTER TABLE `borrowers_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `authors_books`
--
ALTER TABLE `authors_books`
  ADD CONSTRAINT `authors_ID` FOREIGN KEY (`authorID`) REFERENCES `authors` (`id`),
  ADD CONSTRAINT `book_ID` FOREIGN KEY (`bookID`) REFERENCES `books` (`id`);

--
-- Constraints for table `borrowers_books`
--
ALTER TABLE `borrowers_books`
  ADD CONSTRAINT `Borrower_ID` FOREIGN KEY (`borrowerID`) REFERENCES `borrowers` (`id`),
  ADD CONSTRAINT `bookID` FOREIGN KEY (`bookID`) REFERENCES `books` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
