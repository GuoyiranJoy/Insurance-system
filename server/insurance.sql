/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50741 (5.7.41)
 Source Host           : localhost:3306
 Source Schema         : insurance

 Target Server Type    : MySQL
 Target Server Version : 50741 (5.7.41)
 File Encoding         : 65001

 Date: 30/04/2023 14:34:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for branch
-- ----------------------------
DROP TABLE IF EXISTS `branch`;
CREATE TABLE `branch` (
  `branch_id` int(11) NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of branch
-- ----------------------------
BEGIN;
INSERT INTO `branch` (`branch_id`, `branch_name`) VALUES (1, '北京分公司');
INSERT INTO `branch` (`branch_id`, `branch_name`) VALUES (2, '上海分公司');
INSERT INTO `branch` (`branch_id`, `branch_name`) VALUES (3, '广州分公司');
INSERT INTO `branch` (`branch_id`, `branch_name`) VALUES (4, '香港分公司');
INSERT INTO `branch` (`branch_id`, `branch_name`) VALUES (5, '天津分公司');
INSERT INTO `branch` (`branch_id`, `branch_name`) VALUES (6, '武汉分公司');
INSERT INTO `branch` (`branch_id`, `branch_name`) VALUES (7, '杭州分公司');
COMMIT;

-- ----------------------------
-- Table structure for car_insurance_rate
-- ----------------------------
DROP TABLE IF EXISTS `car_insurance_rate`;
CREATE TABLE `car_insurance_rate` (
  `car_insur_id` int(11) NOT NULL AUTO_INCREMENT,
  `rate_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name_list` json NOT NULL,
  `branch_name_list` json NOT NULL,
  `insur_type_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vehicle_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '车辆类型',
  `insur_starttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `insur_endtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `commission_rate_in` double NOT NULL COMMENT '进项',
  `commission_rate_out` double NOT NULL COMMENT '支项',
  `is_checked` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否审核',
  PRIMARY KEY (`car_insur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of car_insurance_rate
-- ----------------------------
BEGIN;
INSERT INTO `car_insurance_rate` (`car_insur_id`, `rate_name`, `company_name_list`, `branch_name_list`, `insur_type_name`, `vehicle_type`, `insur_starttime`, `insur_endtime`, `commission_rate_in`, `commission_rate_out`, `is_checked`) VALUES (1, '家庭自用车车险费率方案', '[\"中信保诚\", \"天安财险\"]', '[\"北京分公司\", \"上海分公司\"]', '交强险', '6座以下', '2019-09-30 00:00:00', '2020-04-09 00:00:00', 0.2, 0.2, 1);
COMMIT;

-- ----------------------------
-- Table structure for check_insur_rule
-- ----------------------------
DROP TABLE IF EXISTS `check_insur_rule`;
CREATE TABLE `check_insur_rule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rule` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name` json NOT NULL,
  `branch_name` json NOT NULL,
  `release_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of check_insur_rule
-- ----------------------------
BEGIN;
INSERT INTO `check_insur_rule` (`id`, `name`, `rule`, `company_name`, `branch_name`, `release_date`) VALUES (2, '测试方案2', '规则2', '[\"中信保诚\", \"平安\"]', '[\"北京分公司\", \"上海分公司\", \"广州分公司\"]', '2020-10-11 00:00:00');
COMMIT;

-- ----------------------------
-- Table structure for commission_rate
-- ----------------------------
DROP TABLE IF EXISTS `commission_rate`;
CREATE TABLE `commission_rate` (
  `rate_id` int(11) NOT NULL AUTO_INCREMENT,
  `insur_id` int(11) NOT NULL,
  `rate_param_name_id` int(11) NOT NULL,
  `in_out` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_period_start` int(11) DEFAULT NULL,
  `year_period_end` int(11) DEFAULT NULL,
  `validate_date_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `validate_date_end` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `param_rate_list` json DEFAULT NULL,
  `in_fyc` tinyint(1) DEFAULT NULL COMMENT '是否计入FYC',
  `param_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '参数说明',
  PRIMARY KEY (`rate_id`) USING BTREE,
  KEY `rate_insur_id` (`insur_id`),
  KEY `rate_param_insur_id` (`rate_param_name_id`),
  CONSTRAINT `rate_insur_id` FOREIGN KEY (`insur_id`) REFERENCES `insurance` (`insur_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rate_param_insur_id` FOREIGN KEY (`rate_param_name_id`) REFERENCES `rate_param_name` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of commission_rate
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of company
-- ----------------------------
BEGIN;
INSERT INTO `company` (`company_id`, `company_name`) VALUES (1, '天安财险');
INSERT INTO `company` (`company_id`, `company_name`) VALUES (2, '中国平安');
INSERT INTO `company` (`company_id`, `company_name`) VALUES (3, '中国人寿');
INSERT INTO `company` (`company_id`, `company_name`) VALUES (4, '中国太保');
INSERT INTO `company` (`company_id`, `company_name`) VALUES (5, '泰康保险');
INSERT INTO `company` (`company_id`, `company_name`) VALUES (6, '中国太平');
INSERT INTO `company` (`company_id`, `company_name`) VALUES (7, '新华保险');
COMMIT;

-- ----------------------------
-- Table structure for insurance
-- ----------------------------
DROP TABLE IF EXISTS `insurance`;
CREATE TABLE `insurance` (
  `insur_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `insur_full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `insur_short_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `main_or_vice` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '主附约',
  `param_diff_name_id` int(11) NOT NULL COMMENT '参数区别',
  `insur_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '险种类别',
  `start_sale_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stop_sale_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `common_year` json DEFAULT NULL COMMENT '交费年期',
  PRIMARY KEY (`insur_id`),
  KEY `insur_company_id` (`company_id`),
  KEY `insur_param_diff` (`param_diff_name_id`),
  CONSTRAINT `insur_company_id` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `insur_param_diff` FOREIGN KEY (`param_diff_name_id`) REFERENCES `param_diff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of insurance
-- ----------------------------
BEGIN;
INSERT INTO `insurance` (`insur_id`, `company_id`, `insur_full_name`, `insur_short_name`, `code`, `main_or_vice`, `param_diff_name_id`, `insur_type`, `start_sale_time`, `stop_sale_time`, `remark`, `common_year`) VALUES (4, 1, '人身威胁保险', '', '129402', '主约', 3, '健康险-长期', '2019-11-30 00:00:00', '2023-04-17 00:00:00', '', '[{\"year\": \"5\", \"description\": \"null\"}, {\"year\": \"10\", \"description\": \"null\"}, {\"year\": \"15\", \"description\": \"null\"}]');
INSERT INTO `insurance` (`insur_id`, `company_id`, `insur_full_name`, `insur_short_name`, `code`, `main_or_vice`, `param_diff_name_id`, `insur_type`, `start_sale_time`, `stop_sale_time`, `remark`, `common_year`) VALUES (5, 1, '人身威胁保险', '', '129402', '主约', 4, '健康险-长期', '2019-11-30 00:00:00', '2023-04-17 00:00:00', '', '[{\"year\": \"5\", \"description\": \"null\"}, {\"year\": \"10\", \"description\": \"null\"}, {\"year\": \"15\", \"description\": \"null\"}]');
COMMIT;

-- ----------------------------
-- Table structure for param_diff
-- ----------------------------
DROP TABLE IF EXISTS `param_diff`;
CREATE TABLE `param_diff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `param_diff_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of param_diff
-- ----------------------------
BEGIN;
INSERT INTO `param_diff` (`id`, `param_diff_name`, `description`) VALUES (1, '卡单险种', NULL);
INSERT INTO `param_diff` (`id`, `param_diff_name`, `description`) VALUES (2, '车险险种', NULL);
INSERT INTO `param_diff` (`id`, `param_diff_name`, `description`) VALUES (3, '财险险种', NULL);
INSERT INTO `param_diff` (`id`, `param_diff_name`, `description`) VALUES (4, '自营网络平台险种', NULL);
INSERT INTO `param_diff` (`id`, `param_diff_name`, `description`) VALUES (5, '第三方网络平台险种', NULL);
COMMIT;

-- ----------------------------
-- Table structure for rate_param_name
-- ----------------------------
DROP TABLE IF EXISTS `rate_param_name`;
CREATE TABLE `rate_param_name` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rate_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of rate_param_name
-- ----------------------------
BEGIN;
INSERT INTO `rate_param_name` (`id`, `rate_name`, `description`) VALUES (1, '代理合同佣金', NULL);
INSERT INTO `rate_param_name` (`id`, `rate_name`, `description`) VALUES (2, '核发首/续年佣金', NULL);
INSERT INTO `rate_param_name` (`id`, `rate_name`, `description`) VALUES (3, '内部标准保费', NULL);
INSERT INTO `rate_param_name` (`id`, `rate_name`, `description`) VALUES (4, 'CFYC', NULL);
INSERT INTO `rate_param_name` (`id`, `rate_name`, `description`) VALUES (5, '继续率换算系数', NULL);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`user_id`, `username`, `email`, `password`) VALUES (1, 'guoyiran', '735844456@qq.com', '32a27586350927e75130451a11f0b221');
INSERT INTO `user` (`user_id`, `username`, `email`, `password`) VALUES (2, 'weiting', '2500698014@qq.com', '32a27586350927e75130451a11f0b221');
INSERT INTO `user` (`user_id`, `username`, `email`, `password`) VALUES (3, 'weiting2', '2500698014@qq.com', '32a27586350927e75130451a11f0b221');
INSERT INTO `user` (`user_id`, `username`, `email`, `password`) VALUES (4, 'weitingg', '2500698014@qq.com', '32a27586350927e75130451a11f0b221');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
