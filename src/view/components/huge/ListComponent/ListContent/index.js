import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as S from "./styled";
import { ClientScheduleTime } from "./styled";
import moment from "moment";
import Colors from "../../../../../common/style/Colors";

const ListContent = ({
                       color,
                       item,
                       itemType,
                       selectItem,
                       changeListState,
                       onPressItem,
                       isDeleting,
                       checkItem,
                       showMenu,
                     }) => {
  const showInformationContent = () => {
    switch (itemType) {
      case "schedule":
        return (
          <>
            <S.ScheduleNameText nextHour={item.nextHour} passedHour={item.passedHour}>
              {item.client.name}
            </S.ScheduleNameText>
            <S.ScheduleDateText nextHour={item.nextHour} passedHour={item.passedHour}>
              {item.formattedDateHour}
            </S.ScheduleDateText>
            <S.EmployeeNameText>Responsável: {item.employee.name}</S.EmployeeNameText>
          </>
        );

      case "clientSchedule":
        const subDays = parseInt(moment.duration(moment(new Date()).diff(moment(new Date(item.schedule.scheduleDate)))).asDays().toString());
        return (
          <>
            {subDays <= 0
              ? (<S.ClientScheduleTime>
                Agendado para <S.Bold>{item.schedule.formattedDateHour}</S.Bold>
              </S.ClientScheduleTime>)
              : (<S.ClientScheduleTime>
                Última visita há {subDays} dias
              </S.ClientScheduleTime>)}

            <S.NameText textColor={Colors.PURPLE}>{item.procedure.name}</S.NameText>
            <S.EmployeeNameText>Responsável: {item.schedule.employee.name}</S.EmployeeNameText>
          </>
        );

      case "procedure":
        return (
          <>
            <S.NameText textColor={'black'}>{item.name}</S.NameText>
            <S.InlineInformationContent>
              <S.GenericText>{item.time} min </S.GenericText>
              <S.GenericText>R$ {item.value}</S.GenericText>
            </S.InlineInformationContent>
          </>
        );
      default:
        return (
          <>
            <S.NameText textColor={'black'}>{item.name}</S.NameText>
            <S.TelText>{item.tel}</S.TelText>
          </>
        );
    }

  };

  return (
    <S.Container
      onLongPress={() => changeListState(item.id)}
      onPress={() => selectItem(item.id, false)}
      style={({ pressed }) => [
        {
          backgroundColor: item.selected
            ? color
            : pressed
              ? `${Colors.LIGHT_GREY}`
              : `${Colors.BACKGROUND_COLOR}`,
        },
      ]}>
      {isDeleting && (
        <S.DeleteIconContent color={color} selected={item.selected}>
          {item.selected && <Icon name="trash" size={10} color={"black"} />}
        </S.DeleteIconContent>
      )}

      <S.Content itemSelected={item.selected}>
        <S.LeftContent>
          <S.InformationContent selected={item.selected}>
            {showInformationContent()}
          </S.InformationContent>
        </S.LeftContent>
        {itemType !== "clientSchedule" && (


          <S.RightContent>
            {itemType === "schedule" && !isDeleting && item.passedHour && (
              <S.CheckContent selected={item.selected}>
                <S.ConfirmQuestionText>
                  Procedimentos realizados?
                </S.ConfirmQuestionText>
                <BouncyCheckbox
                  style={{ borderColor: Colors.PURPLE }}
                  isChecked={item.checked}
                  onPress={isChecked => checkItem(item.id)}
                  fillColor={Colors.PURPLE}
                  disableBuiltInState={true}
                  disableText={true}
                />
              </S.CheckContent>
            )}

            {showMenu && (
              <S.MenuIconContent
                onPress={onPressItem}
                hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}>
                <Icon name="ellipsis-v" size={18} color={color} />
              </S.MenuIconContent>
            )}
          </S.RightContent>
        )}

      </S.Content>
    </S.Container>
  );
};

export default ListContent;
