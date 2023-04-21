package com.example.insurancesystem.service;

import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.dto.InsuranceForQuery;
import com.example.insurancesystem.entity.Insurance;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-09
 */
public interface IInsuranceService extends IService<Insurance> {

    ResultInfo queryInsurance(InsuranceForQuery param);

    void exportBlank(List<Integer> indexes, String filePath) throws IOException;

    List<Insurance> imp(MultipartFile file) throws IOException;
}
