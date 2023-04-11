package com.example.insurancesystem.service.impl;

import com.example.insurancesystem.entity.Company;
import com.example.insurancesystem.mapper.CompanyMapper;
import com.example.insurancesystem.service.ICompanyService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-09
 */
@Service
public class CompanyServiceImpl extends ServiceImpl<CompanyMapper, Company> implements ICompanyService {

}
