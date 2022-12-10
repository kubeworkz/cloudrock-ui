import { Table } from 'react-bootstrap';

import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

import { SecurityGroupRuleCell } from './SecurityGroupRuleCell';
import { SecurityGroupRuleHeader } from './SecurityGroupRuleHeader';
import { SecurityGroup } from './types';

interface OpenStackSecurityGroupsDialogProps extends TranslateProps {
  resolve: {
    securityGroups: SecurityGroup[];
  };
}

export const OpenStackSecurityGroupsDialog = withTranslation(
  (props: OpenStackSecurityGroupsDialogProps) => (
    <ModalDialog title={props.translate('Security groups details')}>
      {props.resolve.securityGroups.length === 0 &&
        props.translate('Instance does not have any security groups yet.')}
      {props.resolve.securityGroups.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th />
              <SecurityGroupRuleHeader />
            </tr>
          </thead>
          {props.resolve.securityGroups.map((securityGroup) => (
            <tbody key={securityGroup.uuid}>
              {securityGroup.rules.length === 0 ? (
                <tr>
                  <td>
                    <strong>{securityGroup.name.toUpperCase()}</strong>
                    {securityGroup.description && (
                      <div>{securityGroup.description}</div>
                    )}
                  </td>
                </tr>
              ) : (
                securityGroup.rules.map((rule, index) => (
                  <tr key={index}>
                    {index === 0 && (
                      <td rowSpan={securityGroup.rules.length}>
                        <strong>{securityGroup.name.toUpperCase()}</strong>
                        {securityGroup.description && (
                          <div>{securityGroup.description}</div>
                        )}
                      </td>
                    )}
                    <SecurityGroupRuleCell rule={rule} />
                  </tr>
                ))
              )}
            </tbody>
          ))}
        </Table>
      )}
    </ModalDialog>
  ),
);
