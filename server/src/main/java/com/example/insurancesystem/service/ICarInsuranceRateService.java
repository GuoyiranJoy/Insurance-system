package com.example.insurancesystem.service;

import com.example.insurancesystem.entity.CarInsuranceRate;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-09
 */
public interface ICarInsuranceRateService extends IService<CarInsuranceRate> {

    Object queryCarInsuranceRate(List<String> companyNames, List<String> branchNames, String rateName);
}
