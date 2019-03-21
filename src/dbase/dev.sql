SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `accessLevels` (
  `id` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `accessLevels` (`id`, `description`) VALUES
('Private', 'Visible only to a user and their friends'),
('Public', 'Visible to all users and guests'),
('Restricted', 'Visible only to users');

CREATE TABLE `albums` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dateCreated` bigint(20) UNSIGNED DEFAULT NULL,
  `owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `albumsToMediaMap` (
  `album` int(11) NOT NULL,
  `media` int(11) NOT NULL,
  `albumIndex` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `albumsToUsersMap` (
  `albumId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `media` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` enum('image','video') NOT NULL,
  `dateAdded` bigint(20) UNSIGNED DEFAULT NULL,
  `pHash` varchar(16) NOT NULL,
  `fileDate` bigint(20) UNSIGNED DEFAULT NULL,
  `width` int(8) NOT NULL,
  `height` int(8) NOT NULL,
  `filePath` varchar(255) NOT NULL,
  `originalFilename` varchar(255) DEFAULT NULL,
  `hashFilename` varchar(255) DEFAULT NULL,
  `thumbnailFilename` varchar(255) DEFAULT NULL,
  `owner` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `owner` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tagsToAccessLevelMap` (
  `tagId` int(11) NOT NULL,
  `accessLevel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tagsToMediaMap` (
  `tag` int(11) NOT NULL,
  `media` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tagsToUsersMap` (
  `tagId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `userRoles` (
  `id` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `userRoles` (`id`, `description`) VALUES
('Administrator', 'Can add, remove, and edit all media, tags, albums, etc.');

CREATE TABLE `userRolesToUsersMap` (
  `userId` int(11) NOT NULL,
  `userRoleId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `userRolesToUsersMap` (`userId`, `userRoleId`) VALUES
(1, 'Administrator');

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` char(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `requiresPasswordReset` enum('true','false') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `salt`, `requiresPasswordReset`) VALUES
(1, 'Administrator', 'admin@localhost', 'd18c809cc6af599d3e18ec9a01cb2800d4edafbe53e3e4a978b43808ecda08143573f1a6cbc3a8364485e7db3548ec693ff8db794aa52ac882a02f91794712f5', '0b272896cc601bd7d8cde378329951250239dfe13149cd500e6bdf7d542d1ac5', 'true');

CREATE TABLE `usersToUsersFriendMap` (
  `userId` int(11) NOT NULL,
  `friendId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `accessLevels`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

ALTER TABLE `albumsToMediaMap`
  ADD PRIMARY KEY (`album`,`media`);

ALTER TABLE `albumsToUsersMap`
  ADD PRIMARY KEY (`albumId`,`userId`);

ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `hashFilename` (`hashFilename`);

ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `description` (`description`);

ALTER TABLE `tagsToAccessLevelMap`
  ADD PRIMARY KEY (`tagId`,`accessLevel`);

ALTER TABLE `tagsToMediaMap`
  ADD PRIMARY KEY (`tag`,`media`);

ALTER TABLE `tagsToUsersMap`
  ADD PRIMARY KEY (`tagId`,`userId`);

ALTER TABLE `userRoles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `userRolesToUsersMap`
  ADD PRIMARY KEY (`userId`,`userRoleId`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `usersToUsersFriendMap`
  ADD PRIMARY KEY (`userId`,`friendId`);


ALTER TABLE `albums`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
ALTER TABLE `media`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=584;
ALTER TABLE `tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
