package com.example.insurancesystem.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.entity.CarInsuranceRate;
import com.example.insurancesystem.mapper.CarInsuranceRateMapper;
import com.example.insurancesystem.service.ICarInsuranceRateService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
public class CarInsuranceRateServiceImpl extends ServiceImpl<CarInsuranceRateMapper, CarInsuranceRate> implements ICarInsuranceRateService {
    @Autowired
    CarInsuranceRateMapper carInsuranceRateMapper;

    @Override
    public Object queryCarInsuranceRate(List<String> companyNames, List<String> branchNames, String rateName) {
        QueryWrapper<CarInsuranceRate> queryWrapper = new QueryWrapper<>();
        if(companyNames!= null) {
            queryWrapper.and(wrapper -> {
                for (Object element : companyNames) {
                    wrapper.like("company_name_list", element);
                }
            });
        }
        if(branchNames!= null) {
            queryWrapper.and(wrapper -> {
                for (Object element : branchNames) {
                    wrapper.like("branch_name_list", element);
                }
            });
        }
        if(rateName!= null) {
            queryWrapper.like("rate_name", rateName);
        }
        return carInsuranceRateMapper.selectList(queryWrapper);
    }
}
