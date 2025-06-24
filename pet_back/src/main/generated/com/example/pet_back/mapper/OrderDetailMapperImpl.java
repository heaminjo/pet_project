package com.example.pet_back.mapper;

import com.example.pet_back.domain.goods.OrderDetailResponseDTO;
import com.example.pet_back.entity.OrderDetail;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeConstants;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-24T10:55:19+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class OrderDetailMapperImpl implements OrderDetailMapper {

    private final DatatypeFactory datatypeFactory;

    public OrderDetailMapperImpl() {
        try {
            datatypeFactory = DatatypeFactory.newInstance();
        }
        catch ( DatatypeConfigurationException ex ) {
            throw new RuntimeException( ex );
        }
    }

    @Override
    public OrderDetailResponseDTO toDTO(OrderDetail orderDetail) {
        if ( orderDetail == null ) {
            return null;
        }

        OrderDetailResponseDTO.OrderDetailResponseDTOBuilder orderDetailResponseDTO = OrderDetailResponseDTO.builder();

        orderDetailResponseDTO.orderDetailId( orderDetail.getOrderDetailId() );
        orderDetailResponseDTO.goodsQuantity( orderDetail.getGoodsQuantity() );
        orderDetailResponseDTO.goodsPrice( orderDetail.getGoodsPrice() );
        orderDetailResponseDTO.regDate( xmlGregorianCalendarToLocalDate( localDateTimeToXmlGregorianCalendar( orderDetail.getRegDate() ) ) );

        return orderDetailResponseDTO.build();
    }

    @Override
    public List<OrderDetailResponseDTO> toDTOList(List<OrderDetail> orderDetailList) {
        if ( orderDetailList == null ) {
            return null;
        }

        List<OrderDetailResponseDTO> list = new ArrayList<OrderDetailResponseDTO>( orderDetailList.size() );
        for ( OrderDetail orderDetail : orderDetailList ) {
            list.add( toDTO( orderDetail ) );
        }

        return list;
    }

    private XMLGregorianCalendar localDateTimeToXmlGregorianCalendar( LocalDateTime localDateTime ) {
        if ( localDateTime == null ) {
            return null;
        }

        return datatypeFactory.newXMLGregorianCalendar(
            localDateTime.getYear(),
            localDateTime.getMonthValue(),
            localDateTime.getDayOfMonth(),
            localDateTime.getHour(),
            localDateTime.getMinute(),
            localDateTime.getSecond(),
            localDateTime.get( ChronoField.MILLI_OF_SECOND ),
            DatatypeConstants.FIELD_UNDEFINED );
    }

    private static LocalDate xmlGregorianCalendarToLocalDate( XMLGregorianCalendar xcal ) {
        if ( xcal == null ) {
            return null;
        }

        return LocalDate.of( xcal.getYear(), xcal.getMonth(), xcal.getDay() );
    }
}
