package com.example.insurancesystem.service;

import com.example.insurancesystem.dto.InsuranceForQuery;
import com.example.insurancesystem.entity.Insurance;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-09
 */
public interface IInsuranceService extends IService<Insurance> {

    Object queryInsurance(InsuranceForQuery param);
}
