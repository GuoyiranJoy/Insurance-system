package com.example.insurancesystem.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeHandler;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@MappedTypes(List.class)
public class ListTypeHandler extends BaseTypeHandler<List<String>> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, List<String> parameter, JdbcType jdbcType) throws SQLException {
        try {
            String json = objectMapper.writeValueAsString(parameter);
            ps.setString(i, json);
        } catch (JsonProcessingException e) {
            throw new SQLException("Failed to convert List to JSON", e);
        }
    }

    @Override
    public List<String> getNullableResult(ResultSet rs, String columnName) throws SQLException {
        try {
            String json = rs.getString(columnName);
            return objectMapper.readValue(json, List.class);
        } catch (IOException e) {
            throw new SQLException("Failed to convert JSON to List", e);
        }
    }

    @Override
    public List<String> getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        try {
            String json = rs.getString(columnIndex);
            return objectMapper.readValue(json, List.class);
        } catch (IOException e) {
            throw new SQLException("Failed to convert JSON to List", e);
        }
    }

    @Override
    public List<String> getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        try {
            String json = cs.getString(columnIndex);
            return objectMapper.readValue(json, List.class);
        } catch (IOException e) {
            throw new SQLException("Failed to convert JSON to List", e);
        }
    }
}