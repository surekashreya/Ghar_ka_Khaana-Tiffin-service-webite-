-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 15, 2023 at 05:38 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tiffin_service`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
CREATE TABLE IF NOT EXISTS `bill` (
  `billno` int(25) NOT NULL AUTO_INCREMENT,
  `customer` varchar(30) DEFAULT NULL,
  `amount` decimal(12,4) DEFAULT NULL,
  PRIMARY KEY (`billno`)
) ENGINE=MyISAM AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`billno`, `customer`, `amount`) VALUES
(62, 'Anjali Sharma', '301.8000'),
(63, 'Reena Chaudhary', '127.2000'),
(64, 'Rahul Saini', '1113.6000'),
(65, 'Rahul Saini', '1468.0000'),
(66, 'Aman Patwal', '420.6000'),
(67, 'Aman Patwal', '911.0000'),
(68, 'Aman Patwal', '719.0000'),
(69, 'Anshika Ladwani', '227.4000'),
(70, 'Aman Patwal', '899.0000'),
(71, 'Aman Patwal', '464.0000'),
(72, 'Anshika Ladwani', '675.0000'),
(73, 'Anshika Ladwani', '619.0000'),
(74, 'Anshika Ladwani', '689.0000'),
(75, 'Anshika Ladwani', '259.0000');

-- --------------------------------------------------------

--
-- Table structure for table `bill_items`
--

DROP TABLE IF EXISTS `bill_items`;
CREATE TABLE IF NOT EXISTS `bill_items` (
  `billno` int(15) NOT NULL,
  `product_id` int(15) DEFAULT NULL,
  `purchase_qty` int(15) DEFAULT NULL,
  `purchase_price` decimal(12,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bill_items`
--

INSERT INTO `bill_items` (`billno`, `product_id`, `purchase_qty`, `purchase_price`) VALUES
(75, 181, 1, '120.00'),
(75, 179, 1, '139.00');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cname` varchar(20) DEFAULT NULL,
  `id` int(10) DEFAULT NULL,
  `qty` int(10) DEFAULT NULL,
  `provname` varchar(40) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_orders`
--

DROP TABLE IF EXISTS `customer_orders`;
CREATE TABLE IF NOT EXISTS `customer_orders` (
  `billno` int(12) DEFAULT NULL,
  `product_id` int(12) DEFAULT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `product_details` varchar(80) DEFAULT NULL,
  `product_category` varchar(25) DEFAULT NULL,
  `product_qty` int(12) DEFAULT NULL,
  `product_price` decimal(12,2) DEFAULT NULL,
  `cname` varchar(40) DEFAULT NULL,
  `provider` varchar(40) DEFAULT NULL,
  `product_image` varchar(40) DEFAULT NULL,
  `provname` varchar(40) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_orders`
--

INSERT INTO `customer_orders` (`billno`, `product_id`, `product_name`, `product_details`, `product_category`, `product_qty`, `product_price`, `cname`, `provider`, `product_image`, `provname`) VALUES
(62, 166, 'Maxican Rice', 'imported maxican rice', 'lunch', 1, '236.00', 'Anjali Sharma', 'meghadutt@gmail.com', '1678795889928.jpeg', 'Megha Dutt'),
(62, 168, 'Chicken Kabab', 'Turkish Chicken', 'dinner', 1, '430.00', 'Anjali Sharma', 'meghadutt@gmail.com', '1678796168267.jpeg', 'Megha Dutt'),
(62, 164, 'Chicken Lasagna', 'spanish dish', 'breakfast', 1, '340.00', 'Anjali Sharma', 'meghadutt@gmail.com', '1678795752903.jpg', 'Megha Dutt'),
(63, 175, 'Gol Gol Jallebi', 'Served with Rasmalayi', 'dinner', 1, '240.00', 'Reena Chaudhary', 'meenakumari@gmail.com', '1678796693011.jpg', 'Meena Kumari'),
(63, 171, 'Avacado Smoothie', 'Special Thandai Mixed', 'lunch', 1, '48.00', 'Reena Chaudhary', 'meenakumari@gmail.com', '1678796398606.jpg', 'Meena Kumari'),
(63, 169, 'Beetroot Juice', 'Multivitamin With Citrus', 'breakfast', 1, '78.00', 'Reena Chaudhary', 'meenakumari@gmail.com', '1678796278864.jpg', 'Meena Kumari'),
(63, 174, 'Moong Dal Halwa', 'made with shakkar', 'dinner', 1, '58.00', 'Reena Chaudhary', 'meenakumari@gmail.com', '1678796621934.jpg', 'Meena Kumari'),
(64, 181, 'Chicken Pasta', 'Chinese Style', 'lunch', 2, '120.00', 'Rahul Saini', 'vikas@gmail.com', '1678797191820.jpg', 'Vikas Bhuvan'),
(64, 183, 'Chinese Buffet', '8 variety of chineese food', 'dinner', 1, '178.00', 'Rahul Saini', 'vikas@gmail.com', '1678797412788.jpeg', 'Vikas Bhuvan'),
(64, 205, 'Bahubali Thali', '20 dishes veg', 'dinner', 3, '1098.00', 'Rahul Saini', 'anuradha@gmail.com', '1678800404718.jpeg', 'Anuradha Rani'),
(65, 174, 'Moong Dal Halwa', 'made with shakkar', 'dinner', 1, '58.00', 'Rahul Saini', 'meenakumari@gmail.com', '1678796621934.jpg', 'Meena Kumari'),
(65, 169, 'Beetroot Juice', 'Multivitamin With Citrus', 'breakfast', 1, '78.00', 'Rahul Saini', 'meenakumari@gmail.com', '1678796278864.jpg', 'Meena Kumari'),
(65, 166, 'Maxican Rice', 'imported maxican rice', 'lunch', 2, '236.00', 'Rahul Saini', 'meghadutt@gmail.com', '1678795889928.jpeg', 'Megha Dutt'),
(65, 168, 'Chicken Kabab', 'Turkish Chicken', 'dinner', 2, '430.00', 'Rahul Saini', 'meghadutt@gmail.com', '1678796168267.jpeg', 'Megha Dutt'),
(66, 166, 'Maxican Rice', 'imported maxican rice', 'lunch', 1, '236.00', 'Aman Patwal', 'meghadutt@gmail.com', '1678795889928.jpeg', 'Megha Dutt'),
(66, 168, 'Chicken Kabab', 'Turkish Chicken', 'dinner', 1, '430.00', 'Aman Patwal', 'meghadutt@gmail.com', '1678796168267.jpeg', 'Megha Dutt'),
(66, 164, 'Chicken Lasagna', 'spanish dish', 'breakfast', 1, '340.00', 'Aman Patwal', 'meghadutt@gmail.com', '1678795752903.jpg', 'Megha Dutt'),
(66, 175, 'Gol Gol Jallebi', 'Served with Rasmalayi', 'dinner', 1, '240.00', 'Aman Patwal', 'meenakumari@gmail.com', '1678796693011.jpg', 'Meena Kumari'),
(66, 169, 'Beetroot Juice', 'Multivitamin With Citrus', 'breakfast', 2, '78.00', 'Aman Patwal', 'meenakumari@gmail.com', '1678796278864.jpg', 'Meena Kumari'),
(67, 168, 'Chicken Kabab', 'Turkish Chicken', 'dinner', 1, '430.00', 'Aman Patwal', 'meghadutt@gmail.com', '1678796168267.jpeg', 'Megha Dutt'),
(67, 166, 'Maxican Rice', 'imported maxican rice', 'lunch', 1, '236.00', 'Aman Patwal', 'meghadutt@gmail.com', '1678795889928.jpeg', 'Megha Dutt'),
(67, 162, 'Egg Roll', 'Eggs With Chicken', 'breakfast', 1, '85.00', 'Aman Patwal', 'meghadutt@gmail.com', '1678795443039.jpeg', 'Megha Dutt'),
(67, 160, 'Rajma Cholle', 'jammu rajma with mdh tadka', 'dinner', 1, '120.00', 'Aman Patwal', 'ajay@gmail.com', '1678795178403.jpeg', 'Ajay Grover'),
(67, 156, 'Allu Paratha', 'made with pahadi allu', 'breakfast', 1, '40.00', 'Aman Patwal', 'ajay@gmail.com', '1678794757885.jpg', 'Ajay Grover'),
(68, 167, 'Kabab', 'Murg Malayi', 'dinner', 1, '398.00', 'Aman Patwal', 'meghadutt@gmail.com', '1678796117453.jpg', 'Megha Dutt'),
(68, 166, 'Maxican Rice', 'imported maxican rice', 'lunch', 1, '236.00', 'Aman Patwal', 'meghadutt@gmail.com', '1678795889928.jpeg', 'Megha Dutt'),
(68, 162, 'Egg Roll', 'Eggs With Chicken', 'breakfast', 1, '85.00', 'Aman Patwal', 'meghadutt@gmail.com', '1678795443039.jpeg', 'Megha Dutt'),
(69, 165, 'Dum Briyani', 'Non-Veg Muglai', 'lunch', 1, '360.00', 'Anshika Ladwani', 'meghadutt@gmail.com', '1678795889928.jpeg', 'Megha Dutt'),
(69, 167, 'Kabab', 'Murg Malayi', 'dinner', 1, '398.00', 'Anshika Ladwani', 'meghadutt@gmail.com', '1678796117453.jpg', 'Megha Dutt'),
(70, 171, 'Avacado Smoothie', 'Special Thandai Mixed', 'lunch', 3, '48.00', 'Aman Patwal', 'meenakumari@gmail.com', '1678796398606.jpg', 'Meena Kumari'),
(70, 174, 'Moong Dal Halwa', 'made with shakkar', 'dinner', 2, '58.00', 'Aman Patwal', 'meenakumari@gmail.com', '1678796621934.jpg', 'Meena Kumari'),
(70, 169, 'Beetroot Juice', 'Multivitamin With Citrus', 'breakfast', 1, '78.00', 'Aman Patwal', 'meenakumari@gmail.com', '1678796278864.jpg', 'Meena Kumari'),
(70, 175, 'Gol Gol Jallebi', 'Served with Rasmalayi', 'dinner', 1, '240.00', 'Aman Patwal', 'meenakumari@gmail.com', '1678796693011.jpg', 'Meena Kumari'),
(70, 166, 'Maxican Rice', 'imported maxican rice', 'lunch', 1, '236.00', 'Aman Patwal', 'meghadutt@gmail.com', '1678795889928.jpeg', 'Megha Dutt'),
(70, 162, 'Egg Roll', 'Eggs With Chicken', 'breakfast', 1, '85.00', 'Aman Patwal', 'meghadutt@gmail.com', '1678795443039.jpeg', 'Megha Dutt'),
(74, 168, 'Chicken Kabab', 'Turkish Chicken', 'dinner', 1, '430.00', 'Anshika Ladwani', 'meghadutt@gmail.com', '1678796168267.jpeg', 'Megha Dutt'),
(73, 179, 'Besan Ka Halwa', 'made with kesar and elaychi', 'breakfast', 1, '139.00', 'Anshika Ladwani', 'vikas@gmail.com', '1678797009582.jpeg', 'Vikas Bhuvan'),
(73, 168, 'Chicken Kabab', 'Turkish Chicken', 'dinner', 1, '430.00', 'Anshika Ladwani', 'meghadutt@gmail.com', '1678796168267.jpeg', 'Megha Dutt'),
(73, 159, 'Panner Chulcha', 'Kurkura Amritsari Style', 'lunch', 1, '50.00', 'Anshika Ladwani', 'ajay@gmail.com', '1678795066526.jpg', 'Ajay Grover'),
(72, 179, 'Besan Ka Halwa', 'made with kesar and elaychi', 'breakfast', 1, '139.00', 'Anshika Ladwani', 'vikas@gmail.com', '1678797009582.jpeg', 'Vikas Bhuvan'),
(72, 181, 'Chicken Pasta', 'Chinese Style', 'lunch', 1, '120.00', 'Anshika Ladwani', 'vikas@gmail.com', '1678797191820.jpg', 'Vikas Bhuvan'),
(72, 175, 'Gol Gol Jallebi', 'Served with Rasmalayi', 'dinner', 1, '240.00', 'Anshika Ladwani', 'meenakumari@gmail.com', '1678796693011.jpg', 'Meena Kumari'),
(72, 171, 'Avacado Smoothie', 'Special Thandai Mixed', 'lunch', 1, '48.00', 'Anshika Ladwani', 'meenakumari@gmail.com', '1678796398606.jpg', 'Meena Kumari'),
(72, 169, 'Beetroot Juice', 'Multivitamin With Citrus', 'breakfast', 1, '78.00', 'Anshika Ladwani', 'meenakumari@gmail.com', '1678796278864.jpg', 'Meena Kumari'),
(72, 159, 'Panner Chulcha', 'Kurkura Amritsari Style', 'lunch', 1, '50.00', 'Anshika Ladwani', 'ajay@gmail.com', '1678795066526.jpg', 'Ajay Grover'),
(74, 181, 'Chicken Pasta', 'Chinese Style', 'lunch', 1, '120.00', 'Anshika Ladwani', 'vikas@gmail.com', '1678797191820.jpg', 'Vikas Bhuvan'),
(74, 179, 'Besan Ka Halwa', 'made with kesar and elaychi', 'breakfast', 1, '139.00', 'Anshika Ladwani', 'vikas@gmail.com', '1678797009582.jpeg', 'Vikas Bhuvan'),
(75, 181, 'Chicken Pasta', 'Chinese Style', 'lunch', 1, '120.00', 'Anshika Ladwani', 'vikas@gmail.com', '1678797191820.jpg', 'Vikas Bhuvan'),
(75, 179, 'Besan Ka Halwa', 'made with kesar and elaychi', 'breakfast', 1, '139.00', 'Anshika Ladwani', 'vikas@gmail.com', '1678797009582.jpeg', 'Vikas Bhuvan');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
CREATE TABLE IF NOT EXISTS `packages` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `destination` varchar(30) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `facility` varchar(100) DEFAULT NULL,
  `startdate` varchar(30) DEFAULT NULL,
  `enddate` varchar(30) DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `source` varchar(50) DEFAULT NULL,
  `package_image` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `name`, `destination`, `description`, `facility`, `startdate`, `enddate`, `price`, `source`, `package_image`) VALUES
(15, 'Mystic', 'thailand', 'Thailand is one of the prettiest South-Asian countries, which is why Thailand tourism has increased over time. Apart from the attractions of the country capital city - Bangkok, Thailand is dotted with rainforests, pretty white sand beaches, amazing taverns, beautiful resorts, and many historical temples.', 'via_bus stay_5days', '27dec', '15jan', '50001.00', 'crazyim.com', '1674393345225.jpg'),
(16, 'Cool', 'maldives', 'one of the best location in world', 'via_bus stay_3days', '27dec', '16jan', '70000.00', 'noobme.com', '1674637821412.jpg'),
(18, 'hell', 'newyork', 'okok', 'via_walk stay_3days', '27dec', '20jan', '80000.00', 'hydro.in', '1674639689687.jpg'),
(19, 'xyz', 'kuala-lampur', 'one of the best location in world', 'via_bus stay_3days', '27dec', '20jan', '50000.00', 'noobme.com', '1675586970610.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `customer` varchar(30) DEFAULT NULL,
  `cardno` varchar(80) DEFAULT NULL,
  `amount` decimal(12,4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=75 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `customer`, `cardno`, `amount`) VALUES
(61, 'Anjali Sharma', '$2b$11$2/6KeH01QJGexDN.nkNbSusP9nA2K8dyq1GCEhB8ny8QYnkqltnWW', '301.8000'),
(62, 'Reena Chaudhary', '$2b$11$rl9hZjIQaDzwACRCbGCnTuOa93jDS5X.WuSvT8u1wEcsNq0jUxRmK', '127.2000'),
(63, 'Rahul Saini', '$2b$11$36KviOJPlM/yE0B45Je3.epKIr06snaJydGJ9HLWNDHoioT2pvJbS', '1113.6000'),
(64, 'Rahul Saini', '$2b$11$LNSkgAT0IlYG.Sy7auZWHucmMA8xFxY0MAebJ51t9ZNx/8h24MnBS', '1468.0000'),
(65, 'Aman Patwal', '$2b$11$vgD3l6MB2R3D7jkL26S8e.MCchMM6FQ2l7lwh5mTBcHdvvI9zwcsa', '420.6000'),
(66, 'Aman Patwal', '$2b$11$WuPiV8eWiydg87.9ljG/Oe4PXDjLVZArZUOsd7NB5QCdnVxZC9sK6', '911.0000'),
(67, 'Aman Patwal', '$2b$11$u5mHHE8rrCFSV7Larq3o6eIn/qlyZptopDljvmIjEve.1ws0Ke1GK', '719.0000'),
(68, 'Anshika Ladwani', '$2b$11$zNkIPV4x7M4ZRwnfhR9lhOpSxqnomKfq76aTYtgneoaF4AMCTJ5Z6', '227.4000'),
(69, 'Aman Patwal', '$2b$11$oUPD65R.g1EgziYmmj6afueGHqvdrxcYX7LV3f0J7Kzjhn6W1OCri', '899.0000'),
(70, 'Aman Patwal', '$2b$11$I2eKU1cSIVa522oJQ6cCs..UkBEXsGIarit8.xuEKagA5ViYAf8u2', '464.0000'),
(71, 'Anshika Ladwani', '$2b$11$Tsy4EFeY28nQ2cAEOxtdXeQHtGd.UXfrYATUj7jBra8YRz9DU7kVe', '675.0000'),
(72, 'Anshika Ladwani', '$2b$11$iSkUAog.ZpusFzlfESUBFe86BGBTh6WsBluekcAP/JBCjN37FgvuK', '619.0000'),
(73, 'Anshika Ladwani', '$2b$11$2sfIA4UA0K9rXIrvPoC5zuLaV95oH9wFyou4Wh6sqEeIb6FJ4OARm', '689.0000'),
(74, 'Anshika Ladwani', '$2b$11$AIj5hRdjIKvJOi8FDN0Y3utEt45e82YEpW5oKfI4GuOitWDAyJNWG', '259.0000');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
CREATE TABLE IF NOT EXISTS `rating` (
  `user` varchar(50) DEFAULT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  `rating` int(10) DEFAULT NULL,
  `pack_id` varchar(45) DEFAULT NULL,
  `provider` varchar(25) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`user`, `comments`, `rating`, `pack_id`, `provider`) VALUES
('Vijay Madan', 'nice food provided', 4, 'ajay@gmail.com', 'Ajay Grover'),
('Vijay Madan', 'nice food provided', 3, 'meenakumari@gmail.com', 'Meena Kumari'),
('Vatan Rana', 'food is fabulus', 4, 'ajay@gmail.com', 'Ajay Grover'),
('Vatan Rana', 'service is good', 4, 'vikas@gmail.com', 'Vikas Bhuvan'),
('Vatan Rana', 'raman has given good services', 5, 'raman@gmail.com', 'Raman Bhutani');

-- --------------------------------------------------------

--
-- Table structure for table `sign_up`
--

DROP TABLE IF EXISTS `sign_up`;
CREATE TABLE IF NOT EXISTS `sign_up` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(35) DEFAULT NULL,
  `password` varchar(80) DEFAULT NULL,
  `category` varchar(30) DEFAULT NULL,
  `username` varchar(40) DEFAULT NULL,
  `city` varchar(18) DEFAULT NULL,
  `address` varchar(450) DEFAULT NULL,
  `mobileno` varchar(15) DEFAULT NULL,
  `avgrating` int(10) DEFAULT NULL,
  `profile_img` varchar(50) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=155 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sign_up`
--

INSERT INTO `sign_up` (`id`, `email`, `password`, `category`, `username`, `city`, `address`, `mobileno`, `avgrating`, `profile_img`, `gender`) VALUES
(122, 'admin@gmail.com', '$2b$11$F1DIfQPdVUJ8hjTht1ZNzePpdRZPa6olOs7/pg67/1W8NXXxbEkea', 'admin', 'admin', 'chandigarh', 'sector 34b chandigarh', '8768475844', NULL, '1678791436333.jpeg', 'Male'),
(153, 'vijaymadan@hotmail.com', '$2b$11$7twlaBaACmzIObN9UaLYIOUwDR4sWRvecz5OqFiRAnnZuR88IGziK', 'customer', 'Vijay Madan', 'Bhuj', 'h no 467, shakti peeth, gujrat', '7887666788', NULL, '1678790636818.jpg', 'Male'),
(124, 'ajay@gmail.com', '$2b$11$wChFkyAWZXgRflKgUorct.KYaxIpP1ppUiNN2yorFZQ.QMyGzV69i', 'provider', 'Ajay Grover', 'Mysuru', 'Sayyaji Rao Rd, Mysuru, Karnataka 570012', '8756485836', 4, '1678815077177.jpg', 'Male'),
(125, 'meghadutt@gmail.com', '$2b$11$fVmhAgcA3j7cy65sy058gu974S1xsVCTEEw5kWBMGHrRINooUJwJ2', 'provider', 'Megha Dutt', 'lucknow', 'L D A Colony,lucknow(U.P.) ,226012 ', '78448473837', NULL, '1678815092705.jpg', 'Female'),
(126, 'meenakumari@gmail.com', '$2b$11$lVRxdckRX69f5w.rD/3MyOKpkQ0CVc8rYUaYr0pd3BTDKaG5xAYSi', 'provider', 'Meena Kumari', 'Panchkula', 'Rajeev Colony, Sector 17, Panchkula(Haryana)', '78447483438', 3, '1678815108433.jpeg', 'Female'),
(127, 'vikas@gmail.com', '$2b$11$C1JfWSwT.w6uLuxXaZYUJeBd89xJ0SUf1fmVw0bDNFXbDTHwr9MaK', 'provider', 'Vikas Bhuvan', 'Kaithal', 'Maharaja Aggarsain Chowk, Kaithal, Haryana, 136027', '786847483787', 4, '1678815122919.jpeg', 'Male'),
(128, 'anuradha@gmail.com', '$2b$11$R7/ywzuWgNJ6ZLu.Ggv3JOBsmFSw/FTJ5owWw8MCzjnk0nk3oF2cG', 'provider', 'Anuradha Rani', 'mohali', 'SCF 78, Phase 5, Mohali 160059 India', '78564846386', NULL, '1678815137987.jpeg', 'Female'),
(154, 'vatanrana@hotmail.com', '$2b$11$7Jj6o2kAwty/Hy9hseVIJ.2CSbCTDWc/RgK7OX5sBERvg2.Dq1ZtG', 'customer', 'Vatan Rana', 'rajgarh', 'almer nagar,rajasthan', '7848498387', NULL, '1678790816579.jpeg', 'Female'),
(131, 'anjali@gmail.com', '$2b$11$foIkVwMiB2UvJWG5YNCQEO2W1cCJNW.yn4SvqAkc/NLZwYDVMZFCG', 'customer', 'Anjali Sharma', 'Panchkula', 'Rajeev Colony, Sector 17, Panchkula(Haryana)', '78474874837', NULL, '1678791600162.jpg', 'Female'),
(132, 'reena@gmail.com', '$2b$11$m0vOZ.SC2bKPqckJmivil.U78W33J2MhigVLB.L/qS6fbfmgljoIy', 'customer', 'Reena Chaudhary', 'Mumbai', 'Opposite Police Line Building, Near Andheri East Station, Mumbai, Maharashtra', '785748747383', NULL, '1678791616585.jpeg', 'Female'),
(133, 'rekha@hotmail.com', '$2b$11$I4dDwfav7/Bodb0DZKi6bOHExPoF.S/Jv2PEhI5LzS9aqIJjlOlKG', 'customer', 'Rekha Gupta', 'Ludhiana', 'Shop 22-23, Main Market, Sarabha Nagar, Ludhiana, Punjab 141001 ', '8837836478', NULL, '1678791631196.jpeg', 'Female'),
(150, 'anshika@gmail.com', '$2b$11$OtjE/4JhWhm8OTeWh1S7YudNgQVBMBWUXU5T/SDNWmIxuiN.9Lbiq', 'customer', 'Anshika Ladwani', 'Patna', '2nd Floor, Chandra Complex, Above Manyavar, Boring Road, Sri Krishnapuri, Patna, Bihar 800001', '874874674746', NULL, '1678790109547.jpeg', 'Female'),
(136, 'david@gmail.com', '$2b$11$XfpoC0Qk6rqRAubiVAz1ZunzNWSHVV4jTGE4mbBY/5MHYoGCVUjEK', 'customer', ' David Coulthard', 'California', '606 N Robertson Blvd, West Hollywood, CA 90069', '87484738378', NULL, '1678791652617.jpeg', 'Male'),
(149, 'murli@gmail.com', '$2b$11$IonpfCqwhk0dysVKrazkSumzmpSYeCjgnKKKr2mqURFnEtJolEF7e', 'customer', 'Murli Basu', 'Allahabad', 'Shikhar Green City at Jhalwa in Allahabad, Devprayagam Colony, Jhalwa, Allahabad', '67886887888', NULL, '1678791687934.jpeg', 'Male'),
(148, 'aman@gmail.com', '$2b$11$pQUwKAp.KvNW1s3uf5I8J.4kfUlO4VD6xTkyQoqCQFvr9TlAkNmDi', 'customer', 'Aman Patwal', 'Panchkula', '19, Ekta Vihar, Main Market Baltana, Near SBI ATM, Near Sector 19, Panchkula, Chandigarh', '78457474768', NULL, '1678789349146.jpg', 'Male'),
(147, 'rahul@hotmail.com', '$2b$11$scAEKG63TnQIdDoEJWLl7uIXcEw1ffOQaoCrmRqmDJLQ65dY8T7Pi', 'customer', 'Rahul Saini', 'rajgarh', 'almer nagar,rajasthan', '7658446387', NULL, '1678791669191.jpeg', 'Male'),
(146, 'jaspreet@gmail.com', '$2b$11$GFjmtvg/g6kv1M09IcPjV.PaqX4WEizIXkzbTNafoae0XgjgCVQBa', 'customer', 'Jaspreet Bhutti', 'Amritsar', 'Ramanand Bagh, Katra Ahluwalia, Amritsar', '8837836478', NULL, '1678791712389.jpg', 'Female'),
(145, 'raman@gmail.com', '$2b$11$eQgIp2gpiW4spAMA8SF5f.qjMUSI8Lr/7exzEzz4fsnhtYaVNS2Wy', 'provider', 'Raman Bhutani', 'ahmedabad', 'Science City Road, Off S. G. Highway, Ahmedabad, Gujarat 380060', '77474837394', NULL, '1678815154723.jpeg', 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `tiffin_details`
--

DROP TABLE IF EXISTS `tiffin_details`;
CREATE TABLE IF NOT EXISTS `tiffin_details` (
  `item_name` varchar(35) DEFAULT NULL,
  `item_details` varchar(88) DEFAULT NULL,
  `item_price` int(8) DEFAULT NULL,
  `item_image` varchar(30) DEFAULT NULL,
  `item_category` varchar(12) DEFAULT NULL,
  `userid` varchar(35) DEFAULT NULL,
  `id` int(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=212 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tiffin_details`
--

INSERT INTO `tiffin_details` (`item_name`, `item_details`, `item_price`, `item_image`, `item_category`, `userid`, `id`) VALUES
('Allu Paratha', 'made with pahadi allu', 40, '1678794757885.jpg', 'breakfast', 'ajay@gmail.com', 156),
('Gobi Paratha', 'Fresh Brocolli with tandoori masala', 50, '1678794866019.jpeg', 'breakfast', 'ajay@gmail.com', 157),
('Cholle Bhature', 'Amritsari Style', 60, '1678794949248.jpg', 'lunch', 'ajay@gmail.com', 158),
('Panner Chulcha', 'Kurkura Amritsari Style', 50, '1678795066526.jpg', 'lunch', 'ajay@gmail.com', 159),
('Rajma Cholle', 'jammu rajma with mdh tadka', 120, '1678795178403.jpeg', 'dinner', 'ajay@gmail.com', 160),
('Dal Makhni', 'Kali Udad Dal', 140, '1678795325107.jpeg', 'dinner', 'ajay@gmail.com', 161),
('Egg Roll', 'Eggs With Chicken', 85, '1678795443039.jpeg', 'breakfast', 'meghadutt@gmail.com', 162),
('Chicken Lasagna', 'spanish dish', 340, '1678795752903.jpg', 'breakfast', 'meghadutt@gmail.com', 164),
('Dum Briyani', 'Non-Veg Muglai', 360, '1678795889928.jpeg', 'lunch', 'meghadutt@gmail.com', 165),
('Maxican Rice', 'imported maxican rice', 236, '1678795889928.jpeg', 'lunch', 'meghadutt@gmail.com', 166),
('Kabab', 'Murg Malayi', 398, '1678796117453.jpg', 'dinner', 'meghadutt@gmail.com', 167),
('Chicken Kabab', 'Turkish Chicken', 430, '1678796168267.jpeg', 'dinner', 'meghadutt@gmail.com', 168),
('Beetroot Juice', 'Multivitamin With Citrus', 78, '1678796278864.jpg', 'breakfast', 'meenakumari@gmail.com', 169),
('Detox Juice', 'Made with Amla, Lemon And Harad', 60, '1678796343963.jpg', 'breakfast', 'meenakumari@gmail.com', 170),
('Avacado Smoothie', 'Special Thandai Mixed', 48, '1678796398606.jpg', 'lunch', 'meenakumari@gmail.com', 171),
('Moong Dal Halwa', 'made with shakkar', 58, '1678796621934.jpg', 'dinner', 'meenakumari@gmail.com', 174),
('Mixed Fruit Yoghurt', 'Made with Jalapenoes,blueberry and more', 140, '1678796529215.jpeg', 'lunch', 'meenakumari@gmail.com', 173),
('Gol Gol Jallebi', 'Served with Rasmalayi', 240, '1678796693011.jpg', 'dinner', 'meenakumari@gmail.com', 175),
('German Pastries', 'Made in German Style', 229, '1678797131633.jpeg', 'breakfast', 'vikas@gmail.com', 180),
('Besan Ka Halwa', 'made with kesar and elaychi', 139, '1678797009582.jpeg', 'breakfast', 'vikas@gmail.com', 179),
('Chicken Pasta', 'Chinese Style', 120, '1678797191820.jpg', 'lunch', 'vikas@gmail.com', 181),
('Italian Pasta', 'Made with Italian Spices and Sauces', 247, '1678797345073.jpeg', 'lunch', 'vikas@gmail.com', 182),
('Chinese Buffet', '8 variety of chineese food', 178, '1678797412788.jpeg', 'dinner', 'vikas@gmail.com', 183),
('Non-Veg Buffet', '12 Collection Of Non-Veg', 379, '1678797514081.jpg', 'dinner', 'vikas@gmail.com', 184),
('Herbal Tea', 'Made With Jungle Ayurveda', 318, '1678797661847.jpeg', 'breakfast', 'anuradha@gmail.com', 185),
('Oats With Apple', 'Fruits Mixed', 78, '1678797870476.jpeg', 'breakfast', 'anuradha@gmail.com', 186),
('Royal Thali', '4roti+3sabji+raita+ chawal and more', 700, '1678797944401.jpg', 'lunch', 'anuradha@gmail.com', 187),
('South-Indian Combo', 'Itli,sambar,vada and many more', 337, '1678798093677.jpeg', 'lunch', 'anuradha@gmail.com', 188),
('Mix Veg ', 'veg with  paneer dish ', 237, '1678800242837.jpeg', 'dinner', 'anuradha@gmail.com', 189),
('Bahubali Thali', '20 dishes veg', 1098, '1678800404718.jpeg', 'dinner', 'anuradha@gmail.com', 205),
('Buttermilk Pancake', 'spanish reciepe', 239, '1678800559500.jpg', 'breakfast', 'raman@gmail.com', 206),
('Methi Paratha', 'Kasturi Methi', 50, '1678800647117.jpeg', 'breakfast', 'raman@gmail.com', 207),
('Kids Lunch Box', 'lunch box for kids', 176, '1678800942750.jpg', 'lunch', 'raman@gmail.com', 208),
('Salad', 'Fruit Salad', 239, '1678800996296.jpeg', 'lunch', 'raman@gmail.com', 209),
('Soya Chaap', 'soya chaap', 280, '1678801091679.jpeg', 'dinner', 'raman@gmail.com', 210),
('Kadi Pakoda', 'kadi made with pakoda', 320, '1678801139244.png', 'dinner', 'raman@gmail.com', 211);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
