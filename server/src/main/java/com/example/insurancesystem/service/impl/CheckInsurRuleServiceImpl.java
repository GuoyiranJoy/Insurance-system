package com.example.insurancesystem.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.entity.CheckInsurRule;
import com.example.insurancesystem.mapper.CheckInsurRuleMapper;
import com.example.insurancesystem.service.ICheckInsurRuleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 郭怡然
 * @since 2023-03-14
 */
@Service
public class CheckInsurRuleServiceImpl extends ServiceImpl<CheckInsurRuleMapper, CheckInsurRule> implements ICheckInsurRuleService {
    CheckInsurRuleMapper checkInsurRuleMapper;

    @Override
    public Object queryInsurRule(List<String> companyNames, List<String> branchNames, String from, String to, String name) {
// Serialize the ArrayList into JSON
        Gson gson = new Gson();
        String jsonCompanyNames = gson.toJson(companyNames);
        String jsonBranchNames = gson.toJson(branchNames);

        QueryWrapper<CheckInsurRule> queryWrapper = new QueryWrapper<>();
        // Construct the comparison logic using JSON_CONTAINS
        queryWrapper.apply("JSON_CONTAINS(company_name, ?)", jsonCompanyNames);
        queryWrapper.apply("JSON_CONTAINS(branch_name, ?)", jsonBranchNames);
        queryWrapper.between("releaseDate", to, from);
        queryWrapper.like("name",name);
        return checkInsurRuleMapper.selectList(queryWrapper);
    }
}
