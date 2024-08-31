import { Button } from '@/components/ui/button'

import { FormControl } from '@/components/ui/form'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from '@/components/ui/command'

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { UseFormReturn } from 'react-hook-form'

type ComboboxSelectProps = {
  field: { value: string | null | undefined }
  options: { label: string; value: string }[] | undefined
  form: UseFormReturn<any>
  value: string
  text: string
}

export function ComboboxSelect({
  options,
  value,
  field,
  form,
  text,
}: ComboboxSelectProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'justify-between p-3 bg-neutral-900',
              (field.value === undefined ||
                field.value === null ||
                field.value === '') &&
                'text-muted-foreground'
            )}
          >
            {field.value !== undefined &&
            field.value !== null &&
            field.value !== '' ? (
              options?.find((option) => option.value === field.value)?.label
            ) : (
              <span></span>
            )}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={`Procurar ${text}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum {text} encontrado.</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    form.setValue(value, option.value)
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      option.value === field.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
