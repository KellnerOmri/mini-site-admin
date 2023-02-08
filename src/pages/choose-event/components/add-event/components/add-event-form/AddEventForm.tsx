import React, {useEffect, useState} from "react";
import {Autocomplete, Checkbox, TextareaAutosize, TextField} from "@mui/material";
import './AddEventForm.scss'
import moment from "moment";
import {GlobalApiService, headersApi} from "../../../../../../services/global-api.service";
import {setCreateEventPopup} from "../../../../../../store/global.slice";
import {useAppDispatch} from "../../../../../../app/hooks";
import {CompModel} from "../../../../../../models/comp.model";

export const AddEventForm = () => {
    const dispatch = useAppDispatch();

    const [compList, setCompList] = useState<CompModel[]>([])
    const [compSelected, setCompSelected] = useState<CompModel | undefined>(compList[0])
    const [eventFormInput, setEventFormInput] = useState<{ [key: string]: number | string | boolean }>(
        {
            eventId: 100,
            comp: compSelected?.comp ? compSelected.comp : 0,
            codeName: "asdf",
            description: compSelected?.description ? compSelected.description : "",
            date: compSelected?.date ? compSelected.date : moment(Date.now()).format("DD/MM/YY"),
            Type: compSelected?.Type ? compSelected.Type : "tri",
            backgroundColor: "#2B76E5",
            secondaryColor: "#808080",
            foregroundColor: "#c3c6d4",
            showMaps: 0,
            tavTeken: 0,
            comments: ""
        });
    const [compInputValue, setCompInputValue] = React.useState("");

    useEffect(() => {
        fetch(`${GlobalApiService}/api/v1/comp`)
            .then((res) => res.json())
            .then((compList) => {
                if (compList.length > 0) {
                    setCompList(compList)
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const compListName: string[] = compList.map((c: CompModel) => {
        return `${c.comp} | ${c.description} | ${c.date} | ${c.Type}`;
    });
    const handleInput = (e: any) => {
        const name = e.target.name;
        const newValue = e.target.value;
        setEventFormInput({...eventFormInput, [name]: newValue as string | number})
    };
    const submitFunction = (e: any) => {
        dispatch(setCreateEventPopup(false))
        fetch(`${GlobalApiService}/api/v1/event`,
            {
                method: 'POST',
                body: JSON.stringify({
                    eventFormInput
                }),
                headers: headersApi
            }
        )
            .then((res) => res.json())
            .then((answer) => {
                console.log(answer, "Event list")
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    return (
        <div className={"add-event-container"}>
            <form id={"add-event-form"} className={"formContainer"} onSubmit={submitFunction}>
                <Autocomplete
                    className={"autocomplete-child"}
                    value={compSelected ? `${compSelected.comp} | ${compSelected.description}` : ""}
                    inputValue={compInputValue}
                    onInputChange={(event, newInputValue) => {
                        setCompInputValue(newInputValue);
                    }}
                    onChange={(event: any, newValue: string | null) => {
                        if (!newValue || newValue === "" || newValue === undefined) {
                            setCompSelected(undefined)
                        } else if (newValue !== null && newValue.split("|").length > 3) {
                            const compSplitValue: string[] = newValue.split("|").map((str) => str.trim());
                            const newComp: CompModel = {
                                comp: Number(compSplitValue[0]),
                                description: compSplitValue[1],
                                date: compSplitValue[2],
                                Type: compSplitValue[3]
                            }
                            setCompSelected(newComp)
                            setEventFormInput({
                                ...eventFormInput,
                                comp: newComp.comp,
                                description: newComp.description,
                                date: newComp.date,
                                Type: newComp.Type
                            })
                        }
                    }}
                    size={"small"}
                    disablePortal
                    id="combo-box-demo"
                    options={compListName}
                    renderInput={params => <TextField style={{fontSize: "30px !important"}}
                                                      className="text-Field-style" {...params} label="Select event"
                                                      name="comp"
                                                      id="comp"
                                                      type={"text"}
                                                      required={true}

                    />}
                />


                <TextField
                    label="Event name"
                    id="description"
                    name="description"
                    type={"text"}
                    disabled={true}
                    value={compSelected ? compSelected.description : "waiting for event..."}
                    required={true}
                    InputLabelProps={{shrink: true}}
                />
                <TextField
                    label="Date"
                    id="date"
                    name="date"
                    type={"text"}
                    value={compSelected ? moment(compSelected.date).format("DD/MM/YY") : "waiting for event..."}
                    disabled={true}
                    required={true}
                    InputLabelProps={{shrink: true}}
                />
                <TextField
                    label="Event type"
                    id="Type"
                    name="Type"
                    type={"text"}
                    value={compSelected ? compSelected.Type : "waiting for event..."}
                    disabled={true}
                    required={true}
                    InputLabelProps={{shrink: true}}
                />
                <TextField
                    label="Background color"
                    id="margin-normal"
                    name="backgroundColor"
                    type={"color"}
                    onChange={handleInput}
                    defaultValue={"#2B76E5"}
                />
                <TextField
                    label="Secondary color"
                    id="margin-normal"
                    name="secondaryColor"
                    type={"color"}
                    onChange={handleInput}
                    defaultValue={"#808080"}
                />
                <TextField
                    label="Foreground color"
                    id="margin-normal"
                    name="foregroundColor"
                    type={"color"}
                    onChange={handleInput}
                    defaultValue={"#c3c6d4"}
                />
                <div className={"checkbox-wrapper"}>
                    <span> Show map</span>
                    <Checkbox
                        name={"showMaps"}
                        onChange={(e) => setEventFormInput({...eventFormInput, "showMaps": e.target.checked ? 1 : 0})}
                    />
                </div>
                <div className={"checkbox-wrapper"}>
                    <span> Tav teken</span>
                    <Checkbox
                        name={"tavTeken"}
                        onChange={(e) => setEventFormInput({...eventFormInput, "tavTeken": e.target.checked ? 1 : 0})}
                    />
                </div>
                <TextareaAutosize onChange={handleInput} id="margin-normal" className={"checkbox-wrapper"}
                                  placeholder={"Add comments"} minRows={0} maxRows={10} name={"comments"}/>
            </form>
        </div>
    );
}
