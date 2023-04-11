package com.example.insurancesystem.mapper;

import com.example.insurancesystem.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 郭怡然
 * @since 2023-04-07
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
