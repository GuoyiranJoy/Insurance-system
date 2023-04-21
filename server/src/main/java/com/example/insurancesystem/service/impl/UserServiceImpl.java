package com.example.insurancesystem.service.impl;

import cn.hutool.crypto.SecureUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.insurancesystem.common.Constants;
import com.example.insurancesystem.common.ResultInfo;
import com.example.insurancesystem.entity.User;
import com.example.insurancesystem.mapper.UserMapper;
import com.example.insurancesystem.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

import static com.example.insurancesystem.controller.UserController.SESSION_NAME;

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

    public ResultInfo register(User user) {
        // 先去数据库找用户名是否存在
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("username", user.getUsername());
        User getUser = getOne(wrapper);
        if (getUser != null) {
            return ResultInfo.error(Constants.CODE_500,"该用户名已存在！");
        }
        // 加密储存用户的密码
        user.setPassword(DigestUtils.md5Hex(user.getPassword()));
        // 存入数据库, 返回成功消息
        return ResultInfo.success(save(user));
    }

    @Override
    public ResultInfo isLogin(HttpSession session) {
        // 从session中取出用户信息
        User sessionUser = (User) session.getAttribute(SESSION_NAME);
        // 若session中没有用户信息这说明用户未登录
        if (sessionUser == null) {
            return ResultInfo.error(Constants.CODE_500,"用户未登录！");
        }
        // 登录了则去数据库取出信息进行比对
        User getUser = getById(sessionUser.getUserId());
        // 如果session用户找不到对应的数据库中的用户或者找出的用户密码和session中用户不一致则说明session中用户信息无效
        if (getUser == null || !getUser.getPassword().equals(sessionUser.getPassword())) {
            return ResultInfo.error(Constants.CODE_500,"用户信息无效！");
        }
        return ResultInfo.success(getUser);
    }

    @Override
        public ResultInfo login(User user) {
        QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
        userQueryWrapper.eq("username", user.getUsername());
        User getUser = getOne(userQueryWrapper);
        // 去数据库查找用户
            if (getUser == null) {
                return ResultInfo.error("用户不存在！");
            }
            // 比对密码（数据库取出用户的密码是加密的，因此要把前端传来的用户密码加密再比对）
            if (!getUser.getPassword().equals(DigestUtils.md5Hex(user.getPassword()))) {
                return ResultInfo.error("用户名或者密码错误！");
            }
            // 设定登录成功消息
            return ResultInfo.success(getUser);
        }
}
