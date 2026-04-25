import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLang = i18n.language ? i18n.language.split('-')[0] : 'vi';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(triggerProps) => (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 px-3 gap-2 font-bold text-slate-600 hover:text-brand-primary"
            {...triggerProps}
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{currentLang}</span>
          </Button>
        )}
      />
      <DropdownMenuContent align="end" className="w-32 rounded-xl">
        <DropdownMenuItem onClick={() => changeLanguage('vi')} className="font-bold cursor-pointer">
          Tiếng Việt
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('en')} className="font-bold cursor-pointer">
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
