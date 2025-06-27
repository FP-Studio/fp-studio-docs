import {
  faExternalLink,
  faQuestionCircle
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface LoRAProps {
  name: string;
  description: string;
  usage?: string;
  examples?: string;
  triggers?: string;
  infoLink?: string;
  downloadLink: string;
}

export default function LoRA({
  name,
  description,
  usage,
  examples,
  triggers,
  infoLink,
  downloadLink
}: LoRAProps) {
  return (
    <div className="card margin-bottom--md">
      <div className="card__header">
        <h3>{name}</h3>
      </div>
      <div className="card__body">
        <div className="container">
          <div className="row">
            <div className="col">
              <p>{description}</p>
            </div>
          </div>
          {usage && (
            <div className="row">
              <div className="col">
                <p>
                  <strong>Usage:</strong> {usage}
                </p>
              </div>
            </div>
          )}
          {examples && (
            <div className="row">
              <div className="col">
                <p>
                  <strong>Example prompts:</strong> {examples}
                </p>
              </div>
            </div>
          )}
          {triggers && (
            <div className="row">
              <div className="col">
                <p>
                  <strong>Trigger words:</strong> {triggers}
                </p>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col text--right">
              {infoLink && (
                <a
                  className="margin-right--md"
                  href={infoLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <button className="button button--info">
                    <FontAwesomeIcon icon={faQuestionCircle} /> Info
                  </button>
                </a>
              )}
              <a href={downloadLink} rel="noopener noreferrer" target="_blank">
                <button className="button button--primary">
                  <FontAwesomeIcon icon={faExternalLink} /> Download
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
