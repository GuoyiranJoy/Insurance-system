package com.example.insurancesystem.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.dto.RuleForQuery;
import com.example.insurancesystem.entity.CheckInsurRule;
import com.example.insurancesystem.mapper.CheckInsurRuleMapper;
import com.example.insurancesystem.service.ICheckInsurRuleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;

import javax.annotation.Resource;
import java.time.LocalDate;
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
    @Resource
    CheckInsurRuleMapper checkInsurRuleMapper;

    @Override
    public Object queryInsurRule(RuleForQuery ruleForQuery) {
        QueryWrapper<CheckInsurRule> queryWrapper = new QueryWrapper<>();
        if (ruleForQuery.getFrom() != null && ruleForQuery.getTo() != null) {
            queryWrapper.between("release_date", ruleForQuery.getFrom()
                    , ruleForQuery.getTo());
        }
            queryWrapper.and(wrapper -> {
                for (Object element : ruleForQuery.getCompanyNames()) {
                    wrapper.like("company_name", element);
                }
            });
        if(ruleForQuery.getBranchNames() != null) {
            queryWrapper.and(wrapper -> {
                for (Object element : ruleForQuery.getBranchNames()) {
                    wrapper.like("branch_name", element);
                }
            });
        }
        if(ruleForQuery.getName() != null) {
            queryWrapper.like("name",ruleForQuery.getName());
        }
        List<CheckInsurRule> data = checkInsurRuleMapper.selectList(queryWrapper);
        return data;
    }
}
