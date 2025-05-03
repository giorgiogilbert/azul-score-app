import { describe, it, expect } from "vitest";
import {getCellImage} from "~/helper/boardHelper";


describe("boardHelper", () => {
    it("cell image", () => {
        expect(getCellImage(0,0)).toBe("/img/cell-5.svg");
        expect(getCellImage(0,1)).toBe("/img/cell-1.svg");

    });

})
