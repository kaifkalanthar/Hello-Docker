import { ChevronDown, Filter, Plus } from "lucide-react";
import { Suspense, useCallback, useMemo, useState } from "react";

import EditDeviceModal from "@/app/(protected)/[slug]/setup/devices/_components/EditDeviceModal";
import { Button } from "@/components/design-system-v2.0/components/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/design-system-v2.0/components/DropdownMenu";
import { Input } from "@/components/design-system-v2.0/components/Input";
import useMatchBreakpoint from "@/lib/hooks/navMenu/useMatchBreakPoint";
import { useAddDeviceQuery } from "@/lib/queries/devices/useAddDeviceQuery";
import { useDeviceFilterStatusStore } from "@/lib/stores/devices/useDeviceFilterStatusStore";
import { useDeviceSearchQueryStore } from "@/lib/stores/devices/useDeviceSearchQueryStore";
import debounce from "@/lib/utils/debounce";

import V2LocationAutoComplete from "../../headers/shared/V2LocationAutoComplete";

const DevicesHeader = () => {
  const { setSearchQuery } = useDeviceSearchQueryStore();
  const [search, setSearch] = useState("");
  const { status, setStatus } = useDeviceFilterStatusStore();
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const { mutate: addDevice, isPending: isAddingNewDevice } = useAddDeviceQuery(
    {
      onClose: () => setIsAddDeviceModalOpen(false),
    }
  );
  const { isMobileView } = useMatchBreakpoint();

  const handleSearchQuery = useCallback(
    (val: string) => {
      setSearchQuery(val);
    },
    [setSearchQuery]
  );
  const debouncedSearchValue = useMemo(
    () => debounce(handleSearchQuery, 1000),
    [handleSearchQuery]
  );

  return (
    <>
      <div className="flex w-full gap-2">
        <Suspense>
          <V2LocationAutoComplete />
        </Suspense>
        <Input
          className="w-full h-fit max-w-full md:max-w-56"
          placeholder="Search Devices"
          type="text"
          value={search}
          onChange={(event) => {
            debouncedSearchValue(event.target.value);
            setSearch(event.target.value);
          }}
          variant={isMobileView ? "outline" : "default"}
        />
      </div>
      <div className="w-full md:w-fit flex justify-end md:justify-normal gap-2 md:gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size={isMobileView ? "sm" : "md"}>
              <Filter />
              Filter
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuCheckboxItem
              checked={status === "active"}
              onCheckedChange={(value) => {
                if (value) {
                  setStatus("active");
                }
              }}
            >
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={status === "in-active"}
              onCheckedChange={(value) => {
                if (value) {
                  setStatus("in-active");
                }
              }}
            >
              In Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuItem onClick={() => setStatus(undefined)}>
              Clear
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="primary"
          size={isMobileView ? "sm" : "md"}
          onClick={() => setIsAddDeviceModalOpen(true)}
        >
          <Plus />
          Add Device
        </Button>
      </div>
      {isAddDeviceModalOpen && (
        <EditDeviceModal
          isOpen={isAddDeviceModalOpen}
          onClose={() => setIsAddDeviceModalOpen(false)}
          title="Add Device"
          isLoading={isAddingNewDevice}
          onSubmit={(data) => {
            addDevice({
              cashier: data.cashier,
              status: data.status,
              server_id: data.server,
              serial_no: data.serialNumber,
              terminal: data.terminal,
              gen_type: data.generation,
              has_lcd: data.lcd ?? false,
            });
          }}
        />
      )}
    </>
  );
};

export default DevicesHeader;
