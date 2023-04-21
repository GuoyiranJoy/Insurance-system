package com.example.insurancesystem.controller;


import com.example.insurancesystem.common.Constants;
import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.entity.User;
import com.example.insurancesystem.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * <p>
 *  用户控制器
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-07
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    IUserService userService;
    /**
     * session的字段名
     */
    public static final String SESSION_NAME = "userInfo";
    /**
     * 用户注册
     *
     * @param user    传入注册用户信息
     * @param errors  Validation的校验错误存放对象
     * @return 注册结果
     */
    @PostMapping("/register")
    public ResultInfo register(@RequestBody User user, BindingResult errors) {
        // 如果校验有错，返回注册失败以及错误信息
        if (errors.hasErrors()) {
            ResultInfo.error(errors.getFieldError().getDefaultMessage());
        }
        // 调用注册服务
        return userService.register(user);
    }

    /**
     * 用户登录
     *
     * @param user    传入登录用户信息
     * @param errors  Validation的校验错误存放对象
     * @param request 请求对象，用于操作session
     * @return 登录结果
     */
    @PostMapping("/login")
    public ResultInfo login(@RequestBody User user, BindingResult errors, HttpServletRequest request) {
        // 如果校验有错，返回登录失败以及错误信息
        if (errors.hasErrors()) {
            return ResultInfo.error(errors.getFieldError().getDefaultMessage());
        }
        // 调用登录服务
        ResultInfo result = userService.login(user);
        // 如果登录成功，则设定session
        if (result.getCode() == Constants.CODE_200) {
            request.getSession().setAttribute(SESSION_NAME, result.getData());
        }
        return result;
    }
    /**
     * 判断用户是否登录
     *
     * @param request 请求对象，从中获取session里面的用户信息以判断用户是否登录
     * @return 结果对象，已经登录则结果为成功，且数据体为用户信息；否则结果为失败，数据体为空
     */
    @GetMapping("/is-login")
    public ResultInfo isLogin(HttpServletRequest request) {
        // 传入session到用户服务层
        return userService.isLogin(request.getSession());
    }

    /**
     * 用户登出
     *
     * @param request 请求，用于操作session
     * @return 结果对象
     */
    @GetMapping("/logout")
    public ResultInfo logout(HttpServletRequest request) {
        // 用户登出很简单，就是把session里面的用户信息设为null即可
        request.getSession().setAttribute(SESSION_NAME, null);
        return ResultInfo.success("用户退出登录成功！");
    }
}

