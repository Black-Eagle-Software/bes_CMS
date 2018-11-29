-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 03, 2018 at 04:30 PM
-- Server version: 10.1.26-MariaDB-0+deb9u1
-- PHP Version: 7.0.30-0+deb9u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `besCMS`
--

-- --------------------------------------------------------

--
-- Table structure for table `accessLevels`
--

CREATE TABLE `accessLevels` (
  `id` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accessLevels`
--

INSERT INTO `accessLevels` (`id`, `description`) VALUES
('Private', 'Visible only to a user and their friends'),
('Public', 'Visible to all users and guests'),
('Restricted', 'Visible only to users');

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dateCreated` bigint(20) UNSIGNED DEFAULT NULL,
  `owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `name`, `dateCreated`, `owner`) VALUES
(2, 'screenshots', 1526239017153, 3);

-- --------------------------------------------------------

--
-- Table structure for table `albumsToMediaMap`
--

CREATE TABLE `albumsToMediaMap` (
  `album` int(11) NOT NULL,
  `media` int(11) NOT NULL,
  `albumIndex` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `albumsToUsersMap`
--

CREATE TABLE `albumsToUsersMap` (
  `albumId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `albumsToUsersMap`
--

INSERT INTO `albumsToUsersMap` (`albumId`, `userId`) VALUES
(2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` enum('image','video') NOT NULL,
  `dateAdded` bigint(20) UNSIGNED DEFAULT NULL,
  `fileDate` bigint(20) UNSIGNED DEFAULT NULL,
  `filePath` varchar(255) NOT NULL,
  `originalFilename` varchar(255) DEFAULT NULL,
  `hashFilename` varchar(255) DEFAULT NULL,
  `thumbnailFilename` varchar(255) DEFAULT NULL,
  `owner` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `type`, `dateAdded`, `fileDate`, `filePath`, `originalFilename`, `hashFilename`, `thumbnailFilename`, `owner`) VALUES
(18, 'image', 1522380852122, 1401325745380, '/media/3/1522380852', '304 Stainless - Materials Library 5282014 90905 PM.bmp', 'dd6e36b5812d5404b67d9064bed7cdc8c8d6e9e5.bmp', 'dd6e36b5812d5404b67d9064bed7cdc8c8d6e9e5_thumb.jpg', 3),
(19, 'image', 1522811336485, 1495649946114, '/media/3/1522811336', 'Calculator 5242017 21905 PM.bmp', '1d2d10653544977f72b1df0832571b5e12a1503e.bmp', '1d2d10653544977f72b1df0832571b5e12a1503e_thumb.jpg', 3),
(20, 'image', 1522811602772, 1386535821875, '/media/3/1522811602', 'Fullscreen capture 1282013 35021 PM.bmp', 'dd38935889e265b8d5e363cc9dfe468f94ee7e14.bmp', 'dd38935889e265b8d5e363cc9dfe468f94ee7e14_thumb.jpg', 3),
(21, 'image', 1522811681607, 1409597683801, '/media/3/1522811681', 'Origin 912014 25443 PM.bmp', '647d84c1781cd2217d7c104eac07150d6b82be6e.bmp', '647d84c1781cd2217d7c104eac07150d6b82be6e_thumb.jpg', 3),
(22, 'image', 1522811962641, 1368331767890, '/media/3/1522811962', 'Survivalism 5122013 120927 AM.bmp', 'f716b8601f8ddc37246176fb3538170761bd0f4d.bmp', 'f716b8601f8ddc37246176fb3538170761bd0f4d_thumb.jpg', 3),
(23, 'image', 1522812101274, 1396741579989, '/media/3/1522812101', 'Wire Library Window from ViewModel - Synchrony Magnetic Bearing Designer 452014 74619 PM.bmp', '154e191ecc86a284ec24712a3bef939c70429a4c.bmp', '154e191ecc86a284ec24712a3bef939c70429a4c_thumb.jpg', 3),
(26, 'image', 1522973811109, 1494165809857, '/media/4/1522973811', 'Fullscreen capture 572017 100329 AM.bmp', '8f26d9e90601ccec1e9b524e97881cdbe336e742.bmp', '8f26d9e90601ccec1e9b524e97881cdbe336e742_thumb.jpg', 4),
(29, 'image', 1524456178053, 1366568530849, '/media/3/1524456178', 'World of Warcraft 4212013 22210 PM.bmp', 'a1b8d389a5f30c18bca7f30681b8948b9dfd6de8.bmp', 'a1b8d389a5f30c18bca7f30681b8948b9dfd6de8_thumb.jpg', 3),
(32, 'image', 1525746300152, 1456285959685, '/media/3/1525746300', 'Logo 3a_resized.png', '63b0903eb4c930d524c564dd451786a5194b3a41.png', '63b0903eb4c930d524c564dd451786a5194b3a41_thumb.jpg', 3),
(47, 'image', 1528690801142, 1528411442724, '/media/4/1528690801', 'Capture.PNG', 'bf296ce781c0b3c490332a996a2167299556a70b.PNG', 'bf296ce781c0b3c490332a996a2167299556a70b_thumb.jpg', 4),
(48, 'image', 1529028137057, 1453421950882, '/media/4/1529028137', 'Screenshot (1).png', 'a4d6602ba81141c5cfe71a68682e6f08c00e7432.png', 'a4d6602ba81141c5cfe71a68682e6f08c00e7432_thumb.jpg', 4),
(49, 'image', 1529028137461, 1474741264803, '/media/4/1529028137', 'Screenshot (2).png', 'bd5a0d90586b579b0e05f8092b026490235b5c97.png', 'bd5a0d90586b579b0e05f8092b026490235b5c97_thumb.jpg', 4),
(50, 'image', 1529031498859, 1452568774972, '/media/4/1529031498', 'Cheer_Girl_7.jpg', '329762fa8a336051531e3a5db9ead1c3258007c1.jpg', '329762fa8a336051531e3a5db9ead1c3258007c1_thumb.jpg', 4);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `owner` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `description`, `owner`) VALUES
(1, 'schoolgirl', 4),
(2, 'Gavin Ramsey', 3),
(3, 'Carla Brown', 4),
(4, 'amateur', 4),
(5, 'cheerleader', 4),
(6, 'Jordan Capri', 4),
(7, 'Jo Evans', 4),
(18, 'screenshot', 3),
(21, 'Jess Impiazzi', 4);

-- --------------------------------------------------------

--
-- Table structure for table `tagsToAccessLevelMap`
--

CREATE TABLE `tagsToAccessLevelMap` (
  `tagId` int(11) NOT NULL,
  `accessLevel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tagsToAccessLevelMap`
--

INSERT INTO `tagsToAccessLevelMap` (`tagId`, `accessLevel`) VALUES
(1, 'Private'),
(2, 'Private'),
(3, 'Private'),
(4, 'Private'),
(5, 'Private'),
(6, 'Private'),
(7, 'Private'),
(18, 'Public'),
(21, 'Private');

-- --------------------------------------------------------

--
-- Table structure for table `tagsToMediaMap`
--

CREATE TABLE `tagsToMediaMap` (
  `tag` int(11) NOT NULL,
  `media` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tagsToMediaMap`
--

INSERT INTO `tagsToMediaMap` (`tag`, `media`) VALUES
(5, 47),
(5, 50),
(18, 18),
(18, 19),
(18, 20),
(18, 21),
(18, 22),
(18, 23),
(18, 26),
(18, 29),
(18, 32),
(18, 47),
(18, 48),
(18, 49);

-- --------------------------------------------------------

--
-- Table structure for table `tagsToUsersMap`
--

CREATE TABLE `tagsToUsersMap` (
  `tagId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tagsToUsersMap`
--

INSERT INTO `tagsToUsersMap` (`tagId`, `userId`) VALUES
(1, 4),
(2, 3),
(3, 4),
(4, 4),
(5, 4),
(6, 4),
(7, 4),
(18, 3);

-- --------------------------------------------------------

--
-- Table structure for table `userRoles`
--

CREATE TABLE `userRoles` (
  `id` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userRoles`
--

INSERT INTO `userRoles` (`id`, `description`) VALUES
('Administrator', 'Can add, remove, and edit all media, tags, albums, etc.');

-- --------------------------------------------------------

--
-- Table structure for table `userRolesToUsersMap`
--

CREATE TABLE `userRolesToUsersMap` (
  `userId` int(11) NOT NULL,
  `userRoleId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userRolesToUsersMap`
--

INSERT INTO `userRolesToUsersMap` (`userId`, `userRoleId`) VALUES
(1, 'Administrator');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` char(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `requiresPasswordReset` enum('true','false') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `salt`, `requiresPasswordReset`) VALUES
(1, 'Administrator', 'admin@localhost', 'd18c809cc6af599d3e18ec9a01cb2800d4edafbe53e3e4a978b43808ecda08143573f1a6cbc3a8364485e7db3548ec693ff8db794aa52ac882a02f91794712f5', '0b272896cc601bd7d8cde378329951250239dfe13149cd500e6bdf7d542d1ac5', 'false'),
(3, 'Gary Ramsey', 'gsramsey@gmail.com', 'a0e8ce4642a16c9deaabe3e5e2beed5a01721dcd1ea4acbb8c84307edda2b92442444cb20bf7b258bd9b8ea0a943c77e045e6ed2d97ed3d69079bdccd6138c41', '749d46f9ef9189c4f5d9366902d52d0ddb7bc6c7fd8db256a1999b3776bf2ebe', 'false'),
(4, 'GR Porn', 'gsramsey@pron.com', 'f95d7b4a3a4e9a1cd074fa5201a024ca0d593c4a292a9d4224a2d92e0c1296b27ff2734f4396747c3e227b152f859667afee96d860f1f38663b8028bb35dcc76', 'e1a87ad85097018de0003b9fb4efb4cc966d72aba57cacd43a8f96315e81c15e', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `usersToUsersFriendMap`
--

CREATE TABLE `usersToUsersFriendMap` (
  `userId` int(11) NOT NULL,
  `friendId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accessLevels`
--
ALTER TABLE `accessLevels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `albumsToMediaMap`
--
ALTER TABLE `albumsToMediaMap`
  ADD PRIMARY KEY (`album`,`media`);

--
-- Indexes for table `albumsToUsersMap`
--
ALTER TABLE `albumsToUsersMap`
  ADD PRIMARY KEY (`albumId`,`userId`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `hashFilename` (`hashFilename`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `description` (`description`);

--
-- Indexes for table `tagsToAccessLevelMap`
--
ALTER TABLE `tagsToAccessLevelMap`
  ADD PRIMARY KEY (`tagId`,`accessLevel`);

--
-- Indexes for table `tagsToMediaMap`
--
ALTER TABLE `tagsToMediaMap`
  ADD PRIMARY KEY (`tag`,`media`);

--
-- Indexes for table `tagsToUsersMap`
--
ALTER TABLE `tagsToUsersMap`
  ADD PRIMARY KEY (`tagId`,`userId`);

--
-- Indexes for table `userRoles`
--
ALTER TABLE `userRoles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userRolesToUsersMap`
--
ALTER TABLE `userRolesToUsersMap`
  ADD PRIMARY KEY (`userId`,`userRoleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `usersToUsersFriendMap`
--
ALTER TABLE `usersToUsersFriendMap`
  ADD PRIMARY KEY (`userId`,`friendId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
