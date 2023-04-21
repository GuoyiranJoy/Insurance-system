package com.example.insurancesystem.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.baomidou.mybatisplus.extension.handlers.FastjsonTypeHandler;
import com.example.insurancesystem.common.ListTypeHandler;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 
 * </p>
 *
 * @author 郭怡然
 * @since 2023-03-14
 */
@Getter
@Setter
//@TableName("check_insur_rule")
@TableName(autoResultMap = true)
@ApiModel(value = "CheckInsurRule对象", description = "")
public class CheckInsurRule implements Serializable {

    private static final long serialVersionUID = 1L;
    @TableId(value = "id", type = IdType.AUTO)
    //非必填
      private Integer id;

    private String name;

    private String rule;
    @TableField(typeHandler = FastjsonTypeHandler.class)
    private List<String> companyName;
    @TableField(typeHandler = FastjsonTypeHandler.class)
    private List<String> branchName;

    private LocalDate releaseDate;


}
