/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50738 (5.7.38)
 Source Host           : localhost:3306
 Source Schema         : insurance

 Target Server Type    : MySQL
 Target Server Version : 50738 (5.7.38)
 File Encoding         : 65001

 Date: 08/05/2023 20:23:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for branch
-- ----------------------------
DROP TABLE IF EXISTS `branch`;
CREATE TABLE `branch`  (
  `branch_id` int(11) NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`branch_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of branch
-- ----------------------------
INSERT INTO `branch` VALUES (1, '北京分公司');
INSERT INTO `branch` VALUES (2, '上海分公司');
INSERT INTO `branch` VALUES (3, '广州分公司');
INSERT INTO `branch` VALUES (4, '香港分公司');
INSERT INTO `branch` VALUES (5, '天津分公司');
INSERT INTO `branch` VALUES (6, '武汉分公司');
INSERT INTO `branch` VALUES (7, '杭州分公司');

-- ----------------------------
-- Table structure for car_insurance_rate
-- ----------------------------
DROP TABLE IF EXISTS `car_insurance_rate`;
CREATE TABLE `car_insurance_rate`  (
  `car_insur_id` int(11) NOT NULL AUTO_INCREMENT,
  `rate_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name_list` json NOT NULL,
  `branch_name_list` json NOT NULL,
  `insur_type_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `vehicle_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '车辆类型',
  `insur_starttime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `insur_endtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `commission_rate_in` double NOT NULL COMMENT '进项',
  `commission_rate_out` double NOT NULL COMMENT '支项',
  `is_checked` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否审核',
  PRIMARY KEY (`car_insur_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of car_insurance_rate
-- ----------------------------
INSERT INTO `car_insurance_rate` VALUES (2, '家庭自用车车险费率方案', '[\"泰康保险\", \"天安财险\"]', '[\"北京分公司\", \"上海分公司\"]', '交强险', '家庭自用汽车6座以下', '2019-09-30 00:00:00', '2020-04-09 00:00:00', 0.2, 0.2, 1);
INSERT INTO `car_insurance_rate` VALUES (8, '企业非营业汽车车险费率', '[\"天安财险\", \"中国太保\", \"中国太平\"]', '[\"北京分公司\", \"上海分公司\"]', '交强险', '企业非营业汽车11-20座', '2019-09-03 00:00:00', '2020-03-31 00:00:00', 0.17, 0.19, 0);
INSERT INTO `car_insurance_rate` VALUES (10, '家庭自用车车险费率方案', '[\"中国太保\", \"中国人寿\", \"中国平安\"]', '[\"天津分公司\"]', '交强险', '家庭自用汽车6座以下', '2023-05-15 00:00:00', '2023-06-14 00:00:00', 0.01, 0.02, 1);
INSERT INTO `car_insurance_rate` VALUES (11, '企业非营业汽车车险费率方案', '[\"中国太保\", \"中国太平\"]', '[\"武汉分公司\"]', '商业险', '家庭自用汽车6座以下', '2023-05-09 00:00:00', '2023-06-12 00:00:00', 0, 0, 0);
INSERT INTO `car_insurance_rate` VALUES (12, '车险费率', '[\"中国太保\", \"中国太平\", \"天安财险\"]', '[\"上海分公司\"]', '商业险', '企业非营业汽车11-20座', '2022-05-09 00:00:00', '2023-07-11 00:00:00', 0.01, 0.03, 0);

-- ----------------------------
-- Table structure for check_insur_rule
-- ----------------------------
DROP TABLE IF EXISTS `check_insur_rule`;
CREATE TABLE `check_insur_rule`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rule` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name` json NOT NULL,
  `branch_name` json NOT NULL,
  `release_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of check_insur_rule
-- ----------------------------
INSERT INTO `check_insur_rule` VALUES (2, '测试方案2', '规则2', '[\"中国人寿\", \"中国平安\"]', '[\"北京分公司\", \"上海分公司\", \"广州分公司\"]', '2023-04-11 00:00:00');
INSERT INTO `check_insur_rule` VALUES (7, '核保规则1', '<p style=\"text-align: left;\"><span style=\"color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 14px;\">核保的保险公司承保环节的核心，通过核保，可以防止带入不具有可保性的风险，排除不合格的保险标的。核保的主要目的在于辨别保险标的的危险程度，并据此对保险</span></p>', '[\"天安财险\", \"中国平安\", \"中国人寿\"]', '[\"上海分公司\"]', '2023-05-01 00:00:00');
INSERT INTO `check_insur_rule` VALUES (8, '测试测试测试', '<p>啊啊😋啊啊啊<strong>啊啊啊啊啊啊啊</strong></p>', '[\"中国太保\"]', '[\"北京分公司\"]', '2023-05-15 00:00:00');
INSERT INTO `check_insur_rule` VALUES (10, '测试规则5', '<h3>😍</h3>', '[\"中国太保\"]', '[\"北京分公司\"]', '2023-05-01 00:00:00');
INSERT INTO `check_insur_rule` VALUES (11, 'ceshi45', '<p>投保人可以为团体，也可为个人。按主被保险人的数量，人数不足 3 人的，为个险业务；人数为 3 人或 3 人以上的，为团险业务。个险业务，要注意控制逆选择风险。团险业务，需提供组织机构证照资料；团体人数低于 10 人的，需提供社保缴纳证明。</p>', '[\"泰康保险\"]', '[\"北京分公司\", \"上海分公司\", \"广州分公司\", \"香港分公司\", \"天津分公司\", \"武汉分公司\", \"杭州分公司\"]', '2023-05-06 00:00:00');
INSERT INTO `check_insur_rule` VALUES (13, '核保规则2', '<p>哈哈哈哈</p>', '[\"中国太保\"]', '[\"广州分公司\"]', '2023-05-06 00:00:00');
INSERT INTO `check_insur_rule` VALUES (15, '核保规则2', '<p>啊啊</p>', '[\"天安财险\"]', '[\"武汉分公司\"]', '2023-05-06 00:00:00');
INSERT INTO `check_insur_rule` VALUES (18, 'aaaaa', '<p><br></p>', '[\"泰康保险\"]', '[\"香港分公司\"]', '2023-05-06 00:00:00');
INSERT INTO `check_insur_rule` VALUES (19, 'a', '<p>a</p>', '[\"中国人寿\"]', '[\"天津分公司\"]', '2023-05-06 00:00:00');

-- ----------------------------
-- Table structure for commission_rate
-- ----------------------------
DROP TABLE IF EXISTS `commission_rate`;
CREATE TABLE `commission_rate`  (
  `rate_id` int(11) NOT NULL AUTO_INCREMENT,
  `insur_id` int(11) NOT NULL,
  `rate_param_name_id` int(11) NOT NULL,
  `in_out` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `year_period_start` int(11) NULL DEFAULT NULL,
  `year_period_end` int(11) NULL DEFAULT NULL,
  `validate_date_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `validate_date_end` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `param_rate_list` json NULL,
  `in_fyc` tinyint(1) NULL DEFAULT NULL COMMENT '是否计入FYC',
  `param_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '参数说明',
  PRIMARY KEY (`rate_id`) USING BTREE,
  INDEX `rate_insur_id`(`insur_id`) USING BTREE,
  INDEX `rate_param_insur_id`(`rate_param_name_id`) USING BTREE,
  CONSTRAINT `rate_insur_id` FOREIGN KEY (`insur_id`) REFERENCES `insurance` (`insur_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `rate_param_insur_id` FOREIGN KEY (`rate_param_name_id`) REFERENCES `rate_param_name` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of commission_rate
-- ----------------------------
INSERT INTO `commission_rate` VALUES (5, 2, 101, '收', 5, 5, '2022-12-31 00:00:00', '2023-05-26 00:00:00', '[{\"rate\": 0.7, \"year\": \"5\"}]', 0, '说明12');
INSERT INTO `commission_rate` VALUES (9, 2, 1, '收', 1, 10, '2023-05-04 00:00:00', '2023-05-04 00:00:00', '[{\"rate\": 0.1, \"year\": \"1\"}, {\"rate\": 0.1, \"year\": \"2\"}, {\"rate\": 0.2, \"year\": \"3\"}, {\"rate\": 0.3, \"year\": \"4\"}, {\"rate\": 0.3, \"year\": \"5\"}, {\"rate\": 0.2, \"year\": \"6\"}, {\"rate\": 0.1, \"year\": \"7\"}, {\"rate\": 0.1, \"year\": \"8\"}, {\"rate\": 0.1, \"year\": \"9\"}, {\"rate\": 0, \"year\": \"10\"}]', NULL, NULL);
INSERT INTO `commission_rate` VALUES (11, 5, 1, '收', 2, 3, '2023-05-01 00:00:00', '2023-06-22 00:00:00', '[{\"rate\": 0.1, \"year\": \"2\"}, {\"rate\": 0.2, \"year\": \"3\"}]', NULL, NULL);

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company`  (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`company_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES (1, '天安财险');
INSERT INTO `company` VALUES (2, '中国平安');
INSERT INTO `company` VALUES (3, '中国人寿');
INSERT INTO `company` VALUES (4, '中国太保');
INSERT INTO `company` VALUES (5, '泰康保险');
INSERT INTO `company` VALUES (6, '中国太平');
INSERT INTO `company` VALUES (7, '新华保险');

-- ----------------------------
-- Table structure for insurance
-- ----------------------------
DROP TABLE IF EXISTS `insurance`;
CREATE TABLE `insurance`  (
  `insur_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `insur_full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `insur_short_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `main_or_vice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '主附约',
  `param_diff_name_id` int(11) NOT NULL COMMENT '参数区别',
  `insur_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '险种类别',
  `start_sale_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stop_sale_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '',
  `common_year` json NULL COMMENT '交费年期',
  PRIMARY KEY (`insur_id`) USING BTREE,
  INDEX `insur_company_id`(`company_id`) USING BTREE,
  INDEX `insur_param_diff`(`param_diff_name_id`) USING BTREE,
  CONSTRAINT `insur_company_id` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `insur_param_diff` FOREIGN KEY (`param_diff_name_id`) REFERENCES `param_diff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of insurance
-- ----------------------------
INSERT INTO `insurance` VALUES (2, 1, '重大疾病保险', '重疾保', 'T5860', '附约', 11, '人寿-分红-两全寿险', '2019-11-03 00:00:00', '2023-04-05 00:00:00', '', '[{\"year\": \"10\", \"description\": \"这是一条说明\"}]');
INSERT INTO `insurance` VALUES (5, 1, '人身威胁保险', '', '129402', '主约', 14, '健康险-长期', '2019-11-30 00:00:00', '2023-04-17 00:00:00', '', '[{\"year\": \"5\", \"description\": \"null\"}, {\"year\": \"10\", \"description\": \"null\"}, {\"year\": \"15\", \"description\": \"null\"}]');
INSERT INTO `insurance` VALUES (6, 2, '平安出境旅行紧急救援团体医疗保险', '出境旅行急救团体医保', 'P0611', '主约', 99, '人寿-分红-终身寿险', '2023-04-03 00:00:00', '2023-06-10 00:00:00', 'remark test', '[]');
INSERT INTO `insurance` VALUES (7, 1, '附加高新技术企业意外伤害团体医疗保险', '附加高新技术医保', 'P0752', '附约', 11, '企业财产保险', '2018-05-07 00:00:00', '2023-04-30 00:00:00', '测试导入', NULL);
INSERT INTO `insurance` VALUES (9, 5, '泰康财富人生团体年金保险（万能型）', '财富人生（万能型）', 'T0616', '主约', 11, '人寿-非分红-年金保险', '2023-03-26 00:00:00', '2026-05-22 00:00:00', '', '[{\"year\": \"1\", \"description\": \"\"}]');
INSERT INTO `insurance` VALUES (11, 1, '险种名称', '', 'P9990', '主约', 6, '人寿-分红-终身寿险', '2023-05-06 00:00:00', '2023-05-06 00:00:00', '', NULL);
INSERT INTO `insurance` VALUES (12, 1, '测试险种1', '', 'P0611', '附约', 13, '人寿-分红-两全寿险', '2023-04-30 00:00:00', '2023-05-18 00:00:00', '', '[{\"year\": \"1\", \"description\": \"说明测试\"}]');
INSERT INTO `insurance` VALUES (16, 1, '测试', '测试导入险种', 'C0001', '主约', 11, '', '2023-05-08 14:13:41', '2023-05-08 14:13:41', '', NULL);
INSERT INTO `insurance` VALUES (17, 1, '重大疾病险', '重疾险', '123430', '主约', 6, '人寿-非分红-定期寿险', '2023-05-01 00:00:00', '2023-06-30 00:00:00', '', NULL);

-- ----------------------------
-- Table structure for param_diff
-- ----------------------------
DROP TABLE IF EXISTS `param_diff`;
CREATE TABLE `param_diff`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `param_diff_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of param_diff
-- ----------------------------
INSERT INTO `param_diff` VALUES (6, '一般险种', NULL);
INSERT INTO `param_diff` VALUES (11, '团体险种', NULL);
INSERT INTO `param_diff` VALUES (12, '卡单险种', NULL);
INSERT INTO `param_diff` VALUES (13, '车险险种', NULL);
INSERT INTO `param_diff` VALUES (14, '财险险种', NULL);
INSERT INTO `param_diff` VALUES (98, '自营网络平台险种', NULL);
INSERT INTO `param_diff` VALUES (99, '第三方网络平台险种', NULL);

-- ----------------------------
-- Table structure for rate_param_name
-- ----------------------------
DROP TABLE IF EXISTS `rate_param_name`;
CREATE TABLE `rate_param_name`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rate_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 104 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rate_param_name
-- ----------------------------
INSERT INTO `rate_param_name` VALUES (1, '核发首/续年佣金', NULL);
INSERT INTO `rate_param_name` VALUES (2, '续年度服务津贴', NULL);
INSERT INTO `rate_param_name` VALUES (4, '特别奖金换算', NULL);
INSERT INTO `rate_param_name` VALUES (5, '继续率换算系数', NULL);
INSERT INTO `rate_param_name` VALUES (6, '标准保费折标', NULL);
INSERT INTO `rate_param_name` VALUES (8, '月度奖金', NULL);
INSERT INTO `rate_param_name` VALUES (11, '内部标准保费折标', NULL);
INSERT INTO `rate_param_name` VALUES (12, 'CFYC', NULL);
INSERT INTO `rate_param_name` VALUES (13, '保险公司继续率换算', NULL);
INSERT INTO `rate_param_name` VALUES (101, '首/续年佣金', NULL);
INSERT INTO `rate_param_name` VALUES (102, '销售奖金', NULL);
INSERT INTO `rate_param_name` VALUES (103, '代理合同佣金', NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'guoyiran', '735844456@qq.com', '32a27586350927e75130451a11f0b221');
INSERT INTO `user` VALUES (2, 'weiting', '2500698014@qq.com', '32a27586350927e75130451a11f0b221');
INSERT INTO `user` VALUES (3, 'weiting2', '2500698014@qq.com', '32a27586350927e75130451a11f0b221');
INSERT INTO `user` VALUES (4, 'user1', '1409542681@qq.com', 'e10adc3949ba59abbe56e057f20f883e');
INSERT INTO `user` VALUES (5, 'fyl', '123456789@qq.com', 'f1c1592588411002af340cbaedd6fc33');
INSERT INTO `user` VALUES (6, 'fylaa', '123456789@qq.com', 'f1c1592588411002af340cbaedd6fc33');
INSERT INTO `user` VALUES (7, 'admin', 'aylsn123@qq.com', '009b927906b97d1507451f45d795d55e');
INSERT INTO `user` VALUES (8, 'admin1', '123@1', '202cb962ac59075b964b07152d234b70');
INSERT INTO `user` VALUES (9, 'admin2', '12341@4.com', '81dc9bdb52d04dc20036dbd8313ed055');
INSERT INTO `user` VALUES (10, 'qwer123', 'qwer@qq.com', 'c33367701511b4f6020ec61ded352059');
INSERT INTO `user` VALUES (11, 'ceshiname', 'ceshiname@name.com', 'aec15630b024743b28aa7d9801b2a0fc');
INSERT INTO `user` VALUES (12, 'liushuning', 'lsn666@name.com', 'aec15630b024743b28aa7d9801b2a0fc');

SET FOREIGN_KEY_CHECKS = 1;
