package com.example.insurancesystem.service.impl;

import com.example.insurancesystem.entity.User;
import com.example.insurancesystem.mapper.UserMapper;
import com.example.insurancesystem.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-07
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

}
