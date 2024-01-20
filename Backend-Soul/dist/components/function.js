"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSort = exports.filterQuery = exports.assignTicket = void 0;
const agentSchema_1 = __importDefault(require("../mongodb/model/agentSchema"));
const ticketSchema_1 = __importDefault(require("../mongodb/model/ticketSchema"));
const assignTicket = (ticketId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activeAgents = yield agentSchema_1.default.find({ active: true });
        if (activeAgents.length === 0) {
            console.log("No agent available. Retrying in 1 min.....");
            setTimeout(() => {
                assignTicket(ticketId);
            }, 60000);
            return;
        }
        const nextAgent = activeAgents[0];
        yield agentSchema_1.default.updateOne({ _id: nextAgent._id }, { active: false });
        const updateTicketAgent = yield ticketSchema_1.default.updateOne({ _id: ticketId }, { assignedTo: nextAgent.name, status: "Assigned" });
        console.log(`Ticket ${ticketId} assigned to agent ${nextAgent.name}`);
        return;
    }
    catch (error) {
        console.log("Inside Assign ticket --> 6");
        console.log("Error running assign Ticket function", error);
        return;
    }
});
exports.assignTicket = assignTicket;
const mergeSort = (data, sortType, sortOrder) => {
    if (data.length <= 1) {
        return data;
    }
    const middle = Math.floor(data.length / 2);
    const left = mergeSort(data.slice(0, middle), sortType, sortOrder);
    const right = mergeSort(data.slice(middle), sortType, sortOrder);
    return merge(left, right, sortType, sortOrder);
};
exports.mergeSort = mergeSort;
const merge = (left, right, sortType, sortOrder) => {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (sortOrder === "true") {
            if (left[leftIndex][sortType] <= right[rightIndex][sortType]) {
                result.push(left[leftIndex]);
                leftIndex++;
            }
            else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        else {
            if (left[leftIndex][sortType] >= right[rightIndex][sortType]) {
                result.push(left[leftIndex]);
                leftIndex++;
            }
            else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};
const filterQuery = (getTicket, filter) => {
    let filterOutput = [];
    for (let i = 0; i < getTicket.length; i++) {
        let count = 0;
        let check = 0;
        for (let key in filter) {
            if (filter[key] !== "") {
                check++;
                if (getTicket[i][key] === filter[key]) {
                    count++;
                }
            }
        }
        if (count === check) {
            filterOutput.push(getTicket[i]);
        }
    }
    return filterOutput;
};
exports.filterQuery = filterQuery;
//# sourceMappingURL=function.js.map