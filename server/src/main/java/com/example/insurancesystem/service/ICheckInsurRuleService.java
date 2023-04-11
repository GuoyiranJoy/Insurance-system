package com.example.insurancesystem.service;

import com.example.insurancesystem.entity.CheckInsurRule;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 郭怡然
 * @since 2023-03-14
 */
public interface ICheckInsurRuleService extends IService<CheckInsurRule> {

    Object queryInsurRule(List<String> companyNames, List<String> branchNames, String from, String to, String name);
}
