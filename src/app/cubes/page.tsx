"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import TableRow from "@/components/TableRow";
import { useState } from "react";
import { Cube } from "@/interfaces/Cube";
import genId from "@/lib/genId";
import TableHeader from "@/components/TableHeader";
import ModalCreate from "@/components/ModalCreate";
import loadCubes from "@/lib/loadCubes";
import { useTimerStore } from "@/store/timerStore";
import { Categories } from "@/interfaces/Categories";
import createCube from "@/lib/createCube";

export default function CubesPage() {
  const { cubes, setCubes } = useTimerStore();
  const [isCreatingCube, setIsCreatingCube] = useState<boolean>(false);

  const handleClick = () => {
    setIsCreatingCube(true);
  };

  const handleCreateCube = (name: string, category: Categories) => {
    if (name === "") return;
    const newCubes = createCube({
      cubeName: name,
      category: category,
    });
    setCubes(newCubes);
    setIsCreatingCube(false);
  };

  const handleClose = () => {
    setIsCreatingCube(false);
  };

  const handleSearchFilter = (searchCube: string) => {
    const cubesDB = loadCubes();
    if (!cubesDB) return;
    if (searchCube === "") {
      const cubesDB = loadCubes();
      setCubes(cubesDB);
      return;
    }
    const filterCubes = cubesDB.filter((cube: Cube) =>
      cube.name.toLowerCase().startsWith(searchCube.toLowerCase())
    );

    if (filterCubes) {
      setCubes(filterCubes);
    }
  };

  return (
    <>
      <div className="grow w-full md:max-w-6xl mx-auto flex flex-col border border-zinc-800 rounded-md min-h-full">
        <div className="border-b border-zinc-800 py-4 ">
          <div className="w-full mx-auto">
            <div className="flex justify-between items-center mx-3">
              <div className="font-medium text-2xl">Cubes</div>
              <div className="flex justify-end gap-3">
                {/* Options */}
                <InputText
                  placeholder="Filter your cubes"
                  onChange={handleSearchFilter}
                />
                <Button disabled={false} handleClick={handleClick}>
                  + Cube
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="h-full overflow-auto">
          <div className="table w-full text-sm border-zinc-800">
            <TableHeader />
            <div className="table-row-group h-10 border-b border-zinc-800 text-white text-sm">
              {cubes?.map((cube) => {
                return <TableRow key={genId()} cube={cube} />;
              })}
            </div>
          </div>
        </div>
        {isCreatingCube && (
          <ModalCreate
            handleCreateCube={handleCreateCube}
            handleClose={handleClose}
          />
        )}
      </div>
    </>
  );
}