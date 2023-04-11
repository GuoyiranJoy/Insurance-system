package com.example.insurancesystem.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.dto.InsuranceForQuery;
import com.example.insurancesystem.entity.Insurance;
import com.example.insurancesystem.mapper.InsuranceMapper;
import com.example.insurancesystem.service.IInsuranceService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-09
 */
@Service
public class InsuranceServiceImpl extends ServiceImpl<InsuranceMapper, Insurance> implements IInsuranceService {
    InsuranceMapper insuranceMapper;

    @Override
    public ResultInfo queryInsurance(InsuranceForQuery param) {
        ResultInfo resultInfo = new ResultInfo();
        List<Insurance> result = new ArrayList<>();
        QueryWrapper<Insurance> queryWrapper = new QueryWrapper<>();
        queryWrapper.in("companyName", param.getCompanies());
        queryWrapper.eq("insurFullName", param.getInsurFullName());
        queryWrapper.eq("code", param.getCode());
        queryWrapper.eq("mainOrVice", param.getMainOrVice());
        queryWrapper.eq("paramType", param.getParamType());
        queryWrapper.between("startSaleTime", param.getStartFrom(), param.getStartTo());
        queryWrapper.between("endSaleTime", param.getEndFrom(), param.getEndTo());
        insuranceMapper.selectList(queryWrapper);
        resultInfo.setData(result);
        return resultInfo;
    }
}
