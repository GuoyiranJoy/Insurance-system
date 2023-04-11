package com.example.insurancesystem.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

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
@TableName("check_insur_rule")
@ApiModel(value = "CheckInsurRule对象", description = "")
public class CheckInsurRule implements Serializable {

    private static final long serialVersionUID = 1L;
    @TableId(value = "id", type = IdType.AUTO)
      private Integer id;

    private String name;

    private String rule;

    private List<String> companyName;

    private List<String> branchName;

    private LocalDateTime releaseDate;


}
