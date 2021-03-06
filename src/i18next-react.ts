/**
 * yet another binding for i18next
 * it's so damn hard to get react-18next work in next
 *
 * - required
 */
import {
  createContext,
  createElement,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { i18n, TFunction } from 'i18next';

const I18NextReactContext = createContext<InternalI18nState>(null!);

interface InternalI18nState {
  /**
   * a phantom field
   */
  lng: string;
  /**
   * for Component subtree
   */
  instance: i18n;

  /**
   * @private
   */
  _onLanguageChanged(lng: string): void;
}

export interface I18NFactory {
  /**
   * @param {boolean} inServer
   * @param {string} initialLang
   * @returns {i18n} initialized (and resource-loaded when inServer is true) i18n instance
   */
  (inServer: boolean, initialLang?: string): i18n;
}

const inServer = typeof window === 'undefined';

/**
 * A HOC to hold i18n instance InternalI18nState
 * @param {string|undefined} props.lang
 * @param {I18NFactory} props.factory see {@link I18NFactory}
 */
export const I18NextReactProvider: FunctionComponent<{ lang?: string; factory: I18NFactory }> = (props) => {
  const mounted = useMounted();

  const [internal, setInternal] = useState<InternalI18nState>(() => {
    const instance = props.factory(inServer, props.lang);

    const ret: InternalI18nState = {
      instance,
      lng: instance.language,
      _onLanguageChanged(lang: string) {
        mounted.current && setInternal((prevInstance: InternalI18nState) => ({ ...prevInstance, lang }));
      },
    };

    if (!inServer) {
      instance.on('languageChanged', ret._onLanguageChanged);
    }

    return ret;
  });

  useEffect(() => {
    if (props.lang) {
      internal.instance.changeLanguage(props.lang); // and continue in languageChanged event handler
    }
  }, [props.lang]);

  useEffect(() => () => internal.instance.off('languageChanged', internal._onLanguageChanged), []);

  return createElement(I18NextReactContext.Provider, { value: internal }, props.children);
};

export function useI18n(): i18n {
  return useContext(I18NextReactContext).instance;
}

/**
 * like {@link useI18n}, but return null when resource bundle not available
 * @param {string} lng
 * @param {string} ns
 * @returns {i18n | null}
 */
export function useI18nLoaded(lng?: string, ns?: string): TFunction | null {
  const i18n = useI18n();
  const [resLoad, setResLoadCount] = useState(0);

  useEffect(() => {
    const triggerResourceCheck = () => setResLoadCount((_) => 1 + _);

    i18n.on('loaded', triggerResourceCheck);
    i18n.store.on('added', triggerResourceCheck);
    i18n.store.on('removed', triggerResourceCheck);

    return () => {
      i18n.off('loaded', triggerResourceCheck);
      /**
       * FIXME: remove type cast when my PR lands
       */
      (i18n.store as any).off('added', triggerResourceCheck);
      (i18n.store as any).off('removed', triggerResourceCheck);
    };
  }, [i18n]);

  return useMemo(() => i18n.hasResourceBundle(lng || '', ns || '') ? i18n.getFixedT(lng!, ns) : null, [i18n, lng, ns, resLoad]);
}

export function useMounted() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted;
}
