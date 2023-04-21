package com.example.insurancesystem.service;

import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpSession;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-07
 */
public interface IUserService extends IService<User> {

    ResultInfo register(User user);

    ResultInfo isLogin(HttpSession session);

    ResultInfo login(User user);
}
